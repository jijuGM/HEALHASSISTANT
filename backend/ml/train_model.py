<<<<<<< HEAD
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("PCOS_data.csv")

# Drop unnecessary columns
df = df.drop(columns=["Sl. No", "Patient File No.", "Unnamed: 44"], errors="ignore")

# Target variable
y = df["PCOS (Y/N)"]

# Features
X = df.drop(columns=["PCOS (Y/N)"])

# Convert categorical columns
X = pd.get_dummies(X)

# Handle missing values
X = X.fillna(X.mean())

# Train test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Model
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

model.fit(X_train, y_train)

# Evaluate
preds = model.predict(X_test)

acc = accuracy_score(y_test, preds)

print("Model Accuracy:", acc)

# Save model
joblib.dump(model, "pcos_model.joblib")

=======
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("PCOS_data.csv")

# Drop unnecessary columns
df = df.drop(columns=["Sl. No", "Patient File No.", "Unnamed: 44"], errors="ignore")

# Target variable
y = df["PCOS (Y/N)"]

# Features
X = df.drop(columns=["PCOS (Y/N)"])

# Convert categorical columns
X = pd.get_dummies(X)

# Handle missing values
X = X.fillna(X.mean())

# Train test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Model
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

model.fit(X_train, y_train)

# Evaluate
preds = model.predict(X_test)

acc = accuracy_score(y_test, preds)

print("Model Accuracy:", acc)

# Save model
joblib.dump(model, "pcos_model.joblib")

>>>>>>> 1eba14f7b45a70a1cf2bff915dd3d995e4b5d2e3
print("Model saved as pcos_model.joblib")
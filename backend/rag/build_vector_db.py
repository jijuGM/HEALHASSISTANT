<<<<<<< HEAD
import os

from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma


DATA_PATH = "../data"
VECTOR_DB_PATH = "../vector_db"

documents = []

# Load all txt files
for file in os.listdir(DATA_PATH):

    if file.endswith(".txt"):

        loader = TextLoader(os.path.join(DATA_PATH, file))

        docs = loader.load()

        documents.extend(docs)

print(f"Loaded {len(documents)} documents")

# Split documents
text_splitter = CharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100
)

split_docs = text_splitter.split_documents(documents)

print(f"Created {len(split_docs)} chunks")

# Embedding model
embedding = HuggingFaceEmbeddings()

# Vector database
vectordb = Chroma.from_documents(
    split_docs,
    embedding,
    persist_directory=VECTOR_DB_PATH
)

vectordb.persist()

=======
import os

from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma


DATA_PATH = "../data"
VECTOR_DB_PATH = "../vector_db"

documents = []

# Load all txt files
for file in os.listdir(DATA_PATH):

    if file.endswith(".txt"):

        loader = TextLoader(os.path.join(DATA_PATH, file))

        docs = loader.load()

        documents.extend(docs)

print(f"Loaded {len(documents)} documents")

# Split documents
text_splitter = CharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100
)

split_docs = text_splitter.split_documents(documents)

print(f"Created {len(split_docs)} chunks")

# Embedding model
embedding = HuggingFaceEmbeddings()

# Vector database
vectordb = Chroma.from_documents(
    split_docs,
    embedding,
    persist_directory=VECTOR_DB_PATH
)

vectordb.persist()

>>>>>>> 1eba14f7b45a70a1cf2bff915dd3d995e4b5d2e3
print("Vector DB created successfully")
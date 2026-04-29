
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

VECTOR_DB_PATH = "../vector_db"

# Load embedding model
embedding = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-mpnet-base-v2"
)

# Load vector database
vectordb = Chroma(
    persist_directory=VECTOR_DB_PATH,
    embedding_function=embedding
)

def retrieve_context(question):

    docs = vectordb.similarity_search(question, k=3)

    context = "\n".join([doc.page_content for doc in docs])


from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

VECTOR_DB_PATH = "../vector_db"

# Load embedding model
embedding = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-mpnet-base-v2"
)

# Load vector database
vectordb = Chroma(
    persist_directory=VECTOR_DB_PATH,
    embedding_function=embedding
)

def retrieve_context(question):

    docs = vectordb.similarity_search(question, k=3)

    context = "\n".join([doc.page_content for doc in docs])


    return context
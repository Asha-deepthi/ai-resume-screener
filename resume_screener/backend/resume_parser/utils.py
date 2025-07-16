import fitz  # PyMuPDF
import docx
import re
import spacy

nlp = spacy.load("en_core_web_sm")

def extract_text_from_pdf(path):
    doc = fitz.open(path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def extract_text_from_docx(path):
    doc = docx.Document(path)
    return "\n".join([para.text for para in doc.paragraphs])

def extract_emails(text):
    return re.findall(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text)

def extract_phone_numbers(text):
    # Simple regex for phone numbers - you can improve this!
    return re.findall(r'\b(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,}\b', text)

def extract_name(text):
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    return ""

def extract_skills(text):
    # This is a very simple example — ideally use a skills database or keyword list
    skills = ["Python", "Django", "React", "Machine Learning", "Data Analysis", "NLP", "JavaScript"]
    found = [skill for skill in skills if skill.lower() in text.lower()]
    return ", ".join(found)

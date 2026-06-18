const pdf = require('pdf-parse');
const fs = require('fs');

const analyzeResume = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdf(buffer);
  const text = data.text.toLowerCase();

  const sectionsFound = {
    contact: /(@|phone|mobile|\+?\d{10}|\d{3}[-.\s]?\d{3}[-.\s]?\d{4})/.test(text),
    education: /(b\.?tech|bachelor|university|college|cgpa|gpa|degree)/.test(text),
    skills: /(skills|technologies|tech stack|proficient|expertise)/.test(text),
    projects: /(projects|portfolio|built|developed|implemented)/.test(text),
    github: /github\.com/.test(text),
    linkedin: /linkedin\.com/.test(text),
    certifications: /(certification|certified|udemy|coursera|certificate)/.test(text),
  };

  return sectionsFound;
};

module.exports = { analyzeResume };

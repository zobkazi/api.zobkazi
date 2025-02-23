// Helper function to calculate read time based on word count
const calculateReadTime = (content) => {
    const wordsPerMinute = 200; 
    const wordCount = content.split(/\s+/).length; 
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime;
  };
  

  module.exports = calculateReadTime;
import CategoryBox from '../components/CategoryBox';
import BackgroundWrapper from '../components/BackgroundWrapper';
import TypingText from '../components/TypingText';
const  CWEPage: React.FC = () => {
  const description = `For the purposes of this thesis, a new, detailed categorization of cryptography-related CWEs was developed. 
The goal of this classification is to better organize the individual weaknesses, highlighting the different aspects of cryptographic flaws and facilitating both their understanding and management.

This categorization focuses on seven main categories, each of which is further subdivided into more specific subcategories, as presented below.`;

  return (
    <div>
      
        <BackgroundWrapper>
            <CategoryBox />
            <TypingText text={description} typingSpeed={40} lineDelay={800} />
            
        </BackgroundWrapper>
        
        
      
      
    </div>
  );
}

export default CWEPage;
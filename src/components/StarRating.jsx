import starEmpty from '../assets/star-empty.svg'
import starFilled from '../assets/star-filled.svg'

const StarRating = ({rating}) => {
    const stars =[];
    for(let i = 1; i <=5; i++){
      if(i <= rating){
        stars.push(<img key={`star-filled-${i}`} src={starFilled} alt=''/>)
      } 
      else{
        stars.push(<img key={`star-empty-${i}`} src={starEmpty} alt=''/>)
      }
    }
    return <div>{stars}</div>;
  }

export default StarRating;
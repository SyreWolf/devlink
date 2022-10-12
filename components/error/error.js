import Image from 'next/image'

//This function generates the info of the Error Component => receives (styles and render values) => returns the structure
const ErrorBlock = (props) => {
  //Returns the structure
  return (
    <div className={`fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]`}>
      <Image src={props.src} width={props.width} height={props.height} />
    </div>
  );
}

export default ErrorBlock;

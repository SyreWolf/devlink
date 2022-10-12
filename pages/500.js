import ErrorBlock from '../components/error/error'

const Custom500 = () => {
	return <ErrorBlock src={`/500_error.svg`} width={1050} height={583}/>
}

Custom500.title = 'Error 500';
Custom500.description = 'Generated by create next app';

export default Custom500;
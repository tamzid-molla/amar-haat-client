import { ScaleLoader } from 'react-spinners';

const PageLoader = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <ScaleLoader />
        </div>
    );
};

export default PageLoader;
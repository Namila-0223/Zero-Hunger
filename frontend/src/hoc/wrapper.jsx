import { staggerContainer } from "../util/motion";

const Wrapper = (Component, idName) =>
    function HOC() {
        return (
            <>
                <span className='span' id={idName}>
                    {/* &nbsp; */}
                </span>

                <Component />
            </>
        );
    };

export default Wrapper
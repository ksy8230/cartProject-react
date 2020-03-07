import Header from "./Header";
import PropTypes from 'prop-types';

const AppLayout = ({ children }) => {

    return (
        <>
            <Header />
            {children}
        </>
    );
};

AppLayout.propTypes = {
    children : PropTypes.node,
};

export default AppLayout;

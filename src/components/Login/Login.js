import React, { Component } from 'react';
import { connect } from "react-redux";

import InputCard from "../common/InputCard";
import { setLoading } from "../../actions/global";
import "./Login.css";

class Login extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        if (this.props.loadingState.loading) {
            this.props.setLoading(false);
        }
    }

    render() {
        return (
            <div className="loginCard">
                <InputCard />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userState: state.user,
    loadingState: state.loading
});

export default connect(mapStateToProps, { setLoading })(Login);


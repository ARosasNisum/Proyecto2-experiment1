import axios from "axios";
import {ChangeEvent, FormEvent, useState} from "react";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rePassword: '',
        email: ''
    });

    const [messages, setMessages] = useState({
        username: '',
        password: '',
        rePassword: '',
        email: '',
        global: '',
        success: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        setMessages({...messages, [name]: '', global: ''});

        validationMessages(name)
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const {name} = e.target;
        setMessages({...messages, [name]: '', global: ''});
        validationMessages(name)
    }

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
        return !emailRegex.test(email);
    };

    const validationMessages = (formName: string) => {

        let error = false

        if ((formName == 'all' || formName == 'username') && formData.username === '') {
            setMessages({...messages, username: 'La username è obbligatoria', global: 'La username è obbligatoria'})
        }

        if ((formName == 'all' || formName == 'password') && formData.password === '') {
            setMessages({...messages, password: 'La password è obbligatoria', global: 'La password è obbligatoria'})
            error = true
        }

        if ((formName == 'all' || formName == 'rePassword') && (formData.password !== formData.rePassword || formData.rePassword === '')) {
            setMessages({
                ...messages,
                rePassword: 'La ripetizione della password è obbligatoria',
                global: 'La ripetizione della password è obbligatoria'
            });
            error = true
        }

        if ((formName == 'all' || formName == 'email') && isValidEmail(formData.email)) {
            setMessages({
                ...messages,
                email: 'L\'email inserita non è valida',
                global: 'L\'email inserita non è valida'
            });
            error = true
        }

        if ((formName == 'all' || formName == 'email') && formData.email === '') {
            setMessages({...messages, email: 'L\'email è obbligatoria', global: 'L\'email è obbligatoria'});
            error = true
        }

        return error
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setMessages({username: '', password: '', rePassword: '', email: '', global: '', success: ''});
        const error = validationMessages('all')

        if (error) {
            return
        }

        try {
            const response = await axios.post('http://localhost:8080/register', {
                username: formData.username,
                password: formData.password,
                email: formData.email
            });
            console.log(response.data);
            setMessages({...messages, success: 'L\'utente è stato registrato nel sistema'});
            setFormData({username: '', email: '', password: '', rePassword: ''});
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form-horizontal">
                <h3>Registrazione utente:</h3>

                {messages.global && <div className="alert alert-danger alert-dismissible" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                    {messages.global}
                </div>}

                {messages.success && <div className="alert alert-info alert-dismissible" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                    {messages.success}
                </div>}

                <div className="form-group has-feedback has-feedback-left">
                    <label className="col-sm-2 control-label"><strong>Username:(*)</strong></label>
                    <div className="col-sm-4">
                        <div className="left-inner-addon">
                            <i className="glyphicon glyphicon-user"></i>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                    {messages.username && <div className="col-sm-4">
                        <div className="alert alert-danger alert-variant" role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            {messages.username}
                        </div>
                    </div>}
                </div>

                <div className="form-group has-feedback has-feedback-left">
                    <label className="col-sm-2 control-label"><strong>Password:(*)</strong></label>
                    <div className="col-sm-4">
                        <div className="left-inner-addon">
                            <i className="glyphicon glyphicon-lock"></i>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                    {messages.password && <div className="col-sm-4">
                        <div className="alert alert-danger alert-variant" role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            {messages.password}
                        </div>
                    </div>}
                </div>

                <div className="form-group has-feedback has-feedback-left">
                    <label className="col-sm-2 control-label"><strong>Ripeti password:(*)</strong></label>
                    <div className="col-sm-4">
                        <div className="left-inner-addon">
                            <i className="glyphicon glyphicon-lock"></i>
                            <input
                                type="password"
                                className="form-control"
                                name="rePassword"
                                placeholder="Ripeti password"
                                value={formData.rePassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                    {messages.rePassword && <div className="col-sm-4">
                        <div className="alert alert-danger alert-variant" role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            {messages.rePassword}
                        </div>
                    </div>}
                </div>

                <div className="form-group has-feedback has-feedback-left">
                    <label className="col-sm-2 control-label"><strong>Email(*):</strong></label>
                    <div className="col-sm-4">
                        <div className="left-inner-addon">
                            <i className="glyphicon glyphicon-envelope"></i>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                    {messages.email && <div className="col-sm-4">
                        <div className="alert alert-danger alert-variant" role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            {messages.email}
                        </div>
                    </div>}
                </div>

                <br/>

                <div className="form-group">
                    <div className="col-sm-offset-2 col-xs-10">
                        <p>(*) campo obbligatorio</p>
                    </div>
                </div>

                <br/>

                <div className="form-group">
                    <div className="col-sm-offset-2 col-xs-10">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Registra utente
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;
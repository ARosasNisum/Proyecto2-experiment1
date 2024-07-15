const ProtettaPage = () => {
    return (
        <div>
            <div className="jumbotron">
                <div className="container">
                    <h1>Pagina Protetta</h1>
                    <p>Solo gli utenti autorizzati possono visualizzare questa pagina!</p>
                    <p>
                        <a href="https://github.com/thespringside/gestioneUtenti" target="_blank"
                           className="btn btn-lg btn-info">
                            View Page Source »
                        </a>
                    </p>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h2>Heading</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo,
                            tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                            malesuada magna mollis euismod. Donec sed odio dui.</p>
                        <p>
                            <button className="btn btn-default">View details »</button>
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h2>Heading</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo,
                            tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                            malesuada magna mollis euismod. Donec sed odio dui.</p>
                        <p>
                            <button className="btn btn-default">View details »</button>
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h2>Heading</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo,
                            tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                            malesuada magna mollis euismod. Donec sed odio dui.</p>
                        <p>
                            <button className="btn btn-default">View details »</button>
                        </p>
                    </div>
                </div>
                <hr/>
                <footer>
                    <p>©TheSpringSide 2016</p>
                </footer>
            </div>
        </div>
    );
};

export default ProtettaPage;
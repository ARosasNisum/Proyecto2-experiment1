import {useEffect, useState} from "react";
import axios from "axios";

interface User {
    id: number;
    username: string;
    email: string;
    dataCreazione: string;
    role: string;
}


const ListaUtentiPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof User;
        direction: 'ascending' | 'descending'
    } | null>(null);

    useEffect(() => {
        axios.get('http://localhost:8080/list').then(res => {
            setUsers(res.data)
        })
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const sortedUsers = [...users].sort((a, b) => {
        if (sortConfig !== null) {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
        }
        return 0;
    });

    const filteredUsers = sortedUsers.filter(user =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const requestSort = (key: keyof User) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});
    };

    return (
        <div className="container">
            <h2>Lista utenti registrati:</h2>
            <br/>
            <div className="row">
                <div className="col-md-6">
                    <label>
                        Show
                        <select className="form-control input-sm" value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                                style={{display: 'inline', width: 'auto', margin: '0 10px'}}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                        entries
                    </label>
                </div>
                <div className="col-md-6 text-right">
                    <label>
                        Search:
                        <input type="text" className="form-control input-sm" value={search}
                               onChange={handleSearchChange}
                               style={{display: 'inline', width: 'auto', margin: '0 10px'}}/>
                    </label>
                </div>
            </div>
            <table className="table table-striped table-bordered" style={{width: '100%'}}>
                <thead>
                <tr>
                    <th onClick={() => requestSort('id')} style={{cursor: 'pointer'}}>
                        Id {sortConfig?.key === 'id' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : null}
                    </th>
                    <th onClick={() => requestSort('username')} style={{cursor: 'pointer'}}>
                        Username {sortConfig?.key === 'username' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : null}
                    </th>
                    <th onClick={() => requestSort('email')} style={{cursor: 'pointer'}}>
                        Email {sortConfig?.key === 'email' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : null}
                    </th>
                    <th onClick={() => requestSort('dataCreazione')} style={{cursor: 'pointer'}}>
                        Data
                        Creazione {sortConfig?.key === 'dataCreazione' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : null}
                    </th>
                    <th onClick={() => requestSort('role')} style={{cursor: 'pointer'}}>
                        Ruolo {sortConfig?.key === 'role' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : null}
                    </th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{new Date(user.dataCreazione).toLocaleString()}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="row">
                <div className="col-md-6">
                    <p>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} entries</p>
                </div>
                <div className="col-md-6 text-right">
                    <ul className="pagination">
                        <li className={currentPage === 1 ? 'disabled' : ''}>
                            <a onClick={() => {
                                if (currentPage !== 1) {
                                    setCurrentPage(prev => Math.max(prev - 1, 1))
                                }
                            }}>Previous</a>
                        </li>
                        <li className="active">
                            <a className="btn btn-link">{currentPage}</a>
                        </li>
                        <li className={currentPage === totalPages ? 'disabled' : ''}>
                            <a onClick={() => {
                                if (currentPage !== totalPages) setCurrentPage(prev => Math.min(prev + 1, totalPages))
                            }}>Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ListaUtentiPage;
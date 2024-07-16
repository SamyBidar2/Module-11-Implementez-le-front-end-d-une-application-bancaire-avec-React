import './index.css';
import { Account } from '../../components/account';
import { useSelector } from "react-redux";

export const User = () => {

    const currentUser = useSelector((store) => store.auth.currentUser);

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{currentUser.firstName} {currentUser.lastName} !</h1>
                <button className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Account
                title="Argent Bank Checking (x8349)"
                amount="$2,082.79"
                description="Available Balance"
                >
            </Account>
            <Account
                title="Argent Bank Savings (x6712)"
                amount="$10,928.42"
                description="Available Balance"
                >
            </Account>
            <Account
                title="Argent Bank Credit Card (x8349)"
                amount="$184.30"
                description="Current Balance"
                >
            </Account>
        </main>
    )
  }
  
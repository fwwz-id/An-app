import ButtonIcon from "../../components/atoms/ButtonIcon";
import Layout from "../../components/organism/Layout";

function Settings() {
    return (
        <Layout>
            <section className="container">
                <header>
                    <h1>Settings</h1>
                    <p className="text-bold">Account settings</p>
                </header>

                <section>
                    <ButtonIcon>
                        <span>Delete</span>
                    </ButtonIcon>
                </section>
            </section>
        </Layout>
    );
}

export default Settings;

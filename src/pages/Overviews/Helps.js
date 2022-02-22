import { useState } from "react";

import Status from "../../components/atoms/Status";
import Card from "../../components/molecules/Card";
import Calendar from "../../components/molecules/Calendar";
import Layout from "../../components/organism/Layout";

function Helps() {
    const [calendar, setCalendar] = useState(new Date());

    return (
        <Layout>
            <section className="container">
                <header>
                    <h1>Bantuan dan Support.</h1>
                </header>

                <article className="mt-10 space-y-5 w-11/12 md:w-6/12">
                    {/* Article header */}
                    <div>
                        <h2 className="text-3xl">Bantuan</h2>
                        <h3 className="text-xl">
                            Cara menggunakan aplikasi ini
                        </h3>
                    </div>
                    {/* end of Article header */}

                    {/* Article content */}
                    <div>
                        {/* Home section */}
                        <div>
                            <p className="text-lg font-bold border-b w-max border-gray-800">
                                Home
                            </p>

                            <div className="mt-3">
                                <p>
                                    Halaman <b>Home</b> berisikan sekilas
                                    tentang siapa saja yang sedang hadir saat
                                    ini.
                                </p>
                                <br />
                                <Card className="flex items-center leading-5 w-8/12 p-4 space-x-3 bg-gray-800 text-white mt-3">
                                    <Status className="bg-disabled mt-0.5" />
                                    <span>
                                        Menunjukkan bahwa <br /> <b>sesi</b>{" "}
                                        belum dimulai, atau <b>Ybs</b> belum
                                        terabsen
                                    </span>
                                </Card>
                                <Card className="flex items-center leading-5 w-8/12 p-4 space-x-3 bg-gray-800 text-white mt-3">
                                    <Status className="bg-danger mt-0.5" />
                                    <span>
                                        Menunjukkan bahwa <br /> <b>Ybs</b>{" "}
                                        sedang tidak hadir
                                    </span>
                                </Card>
                                <Card className="flex items-center leading-5 w-8/12 p-4 space-x-3 bg-gray-800 text-white mt-3">
                                    <Status className="bg-success mt-0.5" />
                                    <span>
                                        Menunjukkan bahwa <br /> <b>Ybs</b>{" "}
                                        sedang hadir
                                    </span>
                                </Card>
                            </div>

                            <div className="mt-3 space-y-4">
                                <p className="flex flex-col space-y-2">
                                    <span>
                                        Anda dapat mengklik tanggal pada
                                        kalender untuk mem-filter absensi pada
                                        tanggal yang di inginkan.
                                    </span>
                                    <span>
                                        Tombol cursor atas dan bawah berfungsi
                                        untuk mengganti bulan.
                                    </span>
                                </p>

                                <Calendar
                                    date={calendar}
                                    setter={setCalendar}
                                />
                            </div>
                        </div>
                        {/* end of Home section */}
                    </div>
                    {/* end of Article content */}
                </article>
            </section>
        </Layout>
    );
}

export default Helps;

import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Offcanvas,
  Button,
  Badge,
  Form,
} from "react-bootstrap";
import vacancies from "./data/data.json";
import dayjs from "dayjs";
import "bootstrap-icons/font/bootstrap-icons.css";
import "dayjs/locale/id";
dayjs.locale("id");

const VacanciesPage = () => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // ✨ state pencarian

  const handleShow = (item) => {
    setSelected(item);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelected(null);
  };

  useEffect(() => {
    document.title = "MagangHub Malang-Batu";
  }, []);

  // ✨ Filter data berdasarkan pencarian
  const filteredVacancies = vacancies.filter((item) =>
    `${item.posisi} ${item.perusahaan.nama_perusahaan}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        overflow: "auto",
        height: "100svh",
        width: "100vw",
        padding: "20px 20px 0 20px",
      }}
      className="pb-4"
    >
      <h2 className="mb-2 text-center fw-bold">📋 Daftar Lowongan Maganghub#2 Malang-Batu</h2>
      <h6 className="mb-4 text-center fw-normal">
        Last Update Data: <strong>10/11/2025 16:20 WIB</strong>
      </h6>

      {/* === INPUT SEARCH === */}
      <Container className="mb-4" style={{ maxWidth: "600px" }}>
        <Form.Control
          type="text"
          placeholder="Cari posisi atau perusahaan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="shadow-sm py-3"
          style={{ borderRadius: "12px", fontSize: "1rem" }}
        />
      </Container>

      {/* === GRID LOWONGAN === */}
      <Row xs={1} md={2} lg={4} className="g-4">
        {filteredVacancies.length > 0 ? (
          filteredVacancies.map((item) => {
            const kuota = item.jumlah_kuota || 0;
            const terdaftar = item.jumlah_terdaftar || 0;

            return (
              <Col key={item.id_posisi}>
                <Card
                  className="text-decoration-none shadow h-100 border-0 hover-info pointer"
                  onClick={() => handleShow(item)}
                  style={{ cursor: "pointer",borderRadius: "12px", }}
                >
                  <Card.Img
                    variant="top"
                    src={item.perusahaan.banner || "https://dummyimage.com/400x200/edf2f7/333.png&text=Default+Banner"}
                    style={{
                      aspectRatio: "4/2",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "18px",
                      padding:'8px'
                    }}
                  />
                  <Card.Body>
                    <div className="d-flex align-items-start mb-3">
                      <img
                        src={item.perusahaan.logo || "https://dummyimage.com/40x20/edf2f7/333.png&text=Logo"}
                        alt={item.perusahaan.nama_perusahaan}
                        style={{
                          width: 40,
                          height: 20,
                          objectFit: "contain",
                          marginRight: 15,
                        }}
                      />
                      <Card.Subtitle className="text-muted text-truncate">
                        {item.perusahaan.nama_perusahaan}
                      </Card.Subtitle>
                    </div>
                    <Card.Title
                      className="mb-0 fw-bold"
                      style={{
                        fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                        lineHeight: "1.3",
                      }}
                    >
                      {item.posisi}
                    </Card.Title>
                  </Card.Body>
                  <Card.Footer className="bg-ts border-0">
                    <div className="mb-2">
                      <small>
                        <i className="bi bi-person me-1"></i> {terdaftar} Pelamar
                      </small>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })
        ) : (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-search fs-1 mb-3 d-block"></i>
            Tidak ada lowongan yang cocok dengan pencarianmu.
          </div>
        )}
      </Row>

      {/* === DETAIL OFFCANVAS === */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        className="h-auto rounded-top shadow-lg"
        style={{
          maxHeight: "calc(100dvh - 80px)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)",
        }}
      >
        {selected && (
          <>
            <Offcanvas.Header closeButton className="border-bottom">
              <Offcanvas.Title className="fw-bold">
                Detail Lowongan
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Row>
                {/* === DETAIL KIRI === */}
                <Col md={7} className="pb-5">
                  <div className="mb-3">
                    <table>
                      <tbody>
                        <tr>
                          <td className="pb-4" valign="middle">
                            <span
                              className="text-secondary me-2"
                              style={{ minWidth: "140px" }}
                            >
                              Posisi
                            </span>
                          </td>
                          <td className="pb-4">
                            <h3>{selected.posisi}</h3>
                          </td>
                        </tr>
                        <tr>
                          <td className="pb-4" valign="middle">
                            <span
                              className="text-secondary me-2"
                              style={{ minWidth: "140px" }}
                            >
                              Jenjang
                            </span>
                          </td>
                          <td className="pb-4">
                            <div>
                              {JSON.parse(selected.jenjang).map((j, i) => (
                                <Badge
                                  key={i}
                                  bg="warning-ts"
                                  text="warning"
                                  className="rounded-xs me-2 py-2 px-3"
                                >
                                  {j}
                                </Badge>
                              ))}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="pb-4" valign="middle">
                            <span
                              className="text-secondary me-2"
                              style={{ minWidth: "140px" }}
                            >
                              Program Studi
                            </span>
                          </td>
                          <td className="pb-4">
                            <div>
                              {JSON.parse(selected.program_studi).map((p, i) => (
                                <Badge
                                  key={i}
                                  bg="info-ts"
                                  text="info"
                                  className="rounded-xs me-2 py-2 px-3 my-1"
                                >
                                  {p.title}
                                </Badge>
                              ))}
                            </div>
                          </td>
                        </tr>
                        <tr className="border-bottom">
                          <td className="pb-4" valign="top">
                            <span
                              className="text-secondary me-2"
                              style={{ minWidth: "140px" }}
                            >
                              Deskripsi
                            </span>
                          </td>
                          <td className="pb-4">
                            <p className="mb-0" style={{ whiteSpace: "pre-line" }}>
                              {selected.deskripsi_posisi}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4">
                            <span
                              className="text-secondary me-2"
                              style={{ minWidth: "140px" }}
                            >
                              Batas Akhir Pendaftaran
                            </span>
                          </td>
                          <td className="py-4">
                            <span>
                              {dayjs(selected.jadwal.tanggal_pendaftaran_akhir).format(
                                "DD MMMM YYYY"
                              )}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="pb-4">
                            <span
                              className="text-secondary me-2"
                              style={{ minWidth: "140px" }}
                            >
                              Pelaksanaan
                            </span>
                          </td>
                          <td className="pb-4">
                            <span>
                              {dayjs(selected.jadwal.tanggal_mulai).format(
                                "DD MMMM YYYY"
                              )}{" "}
                              -{" "}
                              {dayjs(selected.jadwal.tanggal_selesai).format(
                                "DD MMMM YYYY"
                              )}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>

                {/* === DETAIL KANAN === */}
                <Col
                  md={5}
                  className="sticky-md-top d-flex flex-column justify-content-start align-items-center text-center border-start"
                  style={{height:"-webkit-fit-content"}}
                >
                  <img
                    src={selected.perusahaan.banner || selected.perusahaan.logo || "https://dummyimage.com/400x300/edf2f7/333.png&text=Default+Banner"}
                    alt={selected.perusahaan.nama_perusahaan}
                    className="img-fluid rounded mb-3"
                    style={{
                      width: "80%",
                      height: "auto",
                      aspectRatio: "4/3",
                      objectFit: "cover",
                    }}
                  />

                  <h5 className="fw-bold">{selected.perusahaan.nama_perusahaan}</h5>
                  <p className="text-muted small">
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    {selected.perusahaan.alamat}
                  </p>

                  <hr />

                  <div className="w-100 pb-5 pb-md-0 d-flex align-items-center">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-100 py-3"
                      onClick={() =>
                        window.open(
                          `https://maganghub.kemenaker.go.id/lowongan/view/${selected.id_posisi}`,
                          "_blank"
                        )
                      }
                    >
                      Daftar Sekarang <i className="bi bi-arrow-right ms-1"></i>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Offcanvas.Body>
          </>
        )}
      </Offcanvas>


        <footer
      className="text-center text-muted pt-4 mt-5 border-top"
      style={{
        fontSize: "0.9rem",
        // backgroundColor: "#f8f9fa",
      }}
    >
      <Container>
        <p className="mb-1">
          Dibuat dengan ❤️ oleh{" "}
          <a
            href="https://dmsanhr.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="fw-semibold text-decoration-none text-yellow"
          >
            DmsAnhr
          </a>
        </p>
        <p className="mb-0">
          Data lowongan diperoleh dari{" "}
          <a
            href="https://maganghub.kemnaker.go.id"
            target="_blank"
            rel="noopener noreferrer"
            className="fw-semibold text-decoration-none text-primary"
          >
            maganghub.kemenaker.go.id
          </a>
        </p>
        {/* <small className="text-secondary d-block mt-2">
          © {new Date().getFullYear()} MagangHub Malang-Batu | All Rights Reserved
        </small> */}
      </Container>
    </footer>

    </div>
  );
};

export default VacanciesPage;

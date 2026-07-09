import { useEffect, useState } from "react";

// ─── Config ────────────────────────────────────────────────────────────────
// Change /api/v1/ to /api/v2/ to demo versioning — the grade column appears.
const STUDENTS_URL = "http://127.0.0.1:8000/api/students/";
// ────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(STUDENTS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // Pagination ON  → { count, next, results: [...] }
        // Pagination OFF → [...]
        setStudents(Array.isArray(data) ? data : data.results ?? []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={styles.info}>Loading students…</p>;
  if (error)   return <p style={styles.error}>Error: {error}</p>;

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Student Database — via Django REST API</h1>
      <p style={styles.sub}>
        Data served by <code>GET /api/v1/students/</code> · Django REST Framework
      </p>

      {students.length === 0 ? (
        <p style={styles.info}>No students found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Enroll No.</th>
              <th style={styles.th}>Python</th>
              <th style={styles.th}>FSD</th>
              <th style={styles.th}>COA</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>%</th>
              {/* grade column only appears in v2 responses */}
              {students[0]?.grade !== undefined && (
                <th style={styles.th}>Grade</th>
              )}
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.id} style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                <td style={styles.td}>{s.name}</td>
                <td style={styles.td}>{s.enroll}</td>
                <td style={{ ...styles.td, textAlign: "center" }}>{s.python}</td>
                <td style={{ ...styles.td, textAlign: "center" }}>{s.fsd}</td>
                <td style={{ ...styles.td, textAlign: "center" }}>{s.coa}</td>
                <td style={{ ...styles.td, textAlign: "center", fontWeight: "bold" }}>
                  {s.total}
                </td>
                <td style={{ ...styles.td, textAlign: "center" }}>
                  {s.percentage}%
                </td>
                {s.grade !== undefined && (
                  <td style={{ ...styles.td, color: gradeColor(s.grade) }}>
                    {s.grade}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p style={styles.note}>
        Switch <code>STUDENTS_URL</code> to <code>/api/v2/students/</code> to see
        the <strong>grade</strong> column — the versioning demo.
      </p>
    </div>
  );
}

function gradeColor(grade) {
  switch (grade) {
    case "Distinction":  return "#0a6640";
    case "First Class":  return "#0d6efd";
    case "Second Class": return "#6f42c1";
    case "Pass":         return "#fd7e14";
    case "Fail":         return "#dc3545";
    default:             return "#212529";
  }
}

// ─── Minimal inline styles ─────────────────────────────────────────────────
const styles = {
  page: {
    fontFamily: "system-ui, Arial, sans-serif",
    maxWidth: 860,
    margin: "0 auto",
    padding: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0e2233",
    marginBottom: 4,
  },
  sub: {
    fontSize: 13,
    color: "#5b6b7b",
    marginBottom: 20,
  },
  info:  { color: "#5b6b7b", fontStyle: "italic" },
  error: { color: "#dc3545", fontWeight: "bold" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
  },
  headerRow: {
    background: "#0e2233",
    color: "#ffffff",
  },
  th: {
    padding: "10px 12px",
    textAlign: "left",
    fontWeight: 600,
    letterSpacing: "0.02em",
  },
  td: {
    padding: "9px 12px",
    borderBottom: "1px solid #d8e0e6",
  },
  rowEven: { background: "#f2f7f9" },
  rowOdd:  { background: "#ffffff" },
  note: {
    marginTop: 20,
    fontSize: 13,
    color: "#5b6b7b",
    borderTop: "1px solid #d8e0e6",
    paddingTop: 12,
  },
};

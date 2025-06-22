import { useState } from 'react';
import type { TestCase } from './types/TestCase';
import TestCaseForm from './components/TestCaseForm';
import TestCaseTable from './components/TestCaseTable';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './App.css';

function App() {
  const [cases, setCases] = useState<TestCase[]>([]);

  const addTestCase = (testCase: TestCase) => {
    setCases(prev => [...prev, testCase]);
  };

  const deleteTestCase = (id: string) => {
    setCases(prev => prev.filter(c => c.id !== id));
  };

  const updateTestCase = (updated: TestCase) => {
    setCases(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };


  const exportToCSV = () => {
    const csvRows = [];

    const headers = Object.keys(cases[0] || {}).join(',');
    csvRows.push(headers);

    for (const testCase of cases) {
      const values = Object.values(testCase).map(value =>
        `"${(value as string).replace(/"/g, '""')}"`
      );
      csvRows.push(values.join(','));
    }

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test-cases.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Test Case Report', 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [[
        'Title', 'Module', 'Preconditions', 'Steps',
        'Expected', 'Actual', 'Status', 'Priority', 'Tester'
      ]],
      body: cases.map(c => [
        c.title,
        c.module,
        c.preconditions,
        c.steps,
        c.expectedResult,
        c.actualResult,
        c.status,
        c.priority,
        c.tester,
      ]),
      styles: { fontSize: 9, cellPadding: 2 },
    });

    doc.save('test-cases.pdf');
  };

  return (
  <div className="app-wrapper">
    <div className="app-container">
      <header>
        <h1>🧪 Test Case Manager</h1>
      </header>

      <main>
        <section className="card">
          <TestCaseForm onAddTestCase={addTestCase} />
        </section>

        <div className="export-buttons">
          <button onClick={exportToCSV} className="csv-btn">🧾 CSV</button>
          <button onClick={exportToPDF} className="pdf-btn">📄 PDF</button>
        </div>

        <section className="card">
          <TestCaseTable cases={cases} onDelete={deleteTestCase} onUpdate={updateTestCase} />
        </section>
      </main>
    </div>
  </div>
);

}

export default App;

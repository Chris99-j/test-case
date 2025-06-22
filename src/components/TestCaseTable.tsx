import React, { useState } from 'react';
import type { TestCase } from '../types/TestCase';
import './TestCaseTable.css';

interface Props {
  cases: TestCase[];
  onDelete: (id: string) => void;
  onUpdate: (updated: TestCase) => void;
}

function TestCaseTable({ cases, onDelete, onUpdate }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Partial<TestCase>>({});

  const startEditing = (testCase: TestCase) => {
    setEditingId(testCase.id);
    setEditedData(testCase);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedData({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editingId && editedData) {
      onUpdate({ ...(editedData as TestCase) });
      cancelEditing();
    }
  };

  return (
    <div className="table-container">
      <table className="testcase-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Module</th>
            <th>Preconditions</th>
            <th>Steps</th>
            <th>Expected</th>
            <th>Actual</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Tester</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map(tc => (
            <tr key={tc.id}>
              {editingId === tc.id ? (
                <>
                  <td><input name="title" value={editedData.title || ''} onChange={handleChange} /></td>
                  <td><input name="module" value={editedData.module || ''} onChange={handleChange} /></td>
                  <td><textarea name="preconditions" value={editedData.preconditions || ''} onChange={handleChange} /></td>
                  <td><textarea name="steps" value={editedData.steps || ''} onChange={handleChange} /></td>
                  <td><textarea name="expectedResult" value={editedData.expectedResult || ''} onChange={handleChange} /></td>
                  <td><textarea name="actualResult" value={editedData.actualResult || ''} onChange={handleChange} /></td>
                  <td>
                    <select name="status" value={editedData.status || ''} onChange={handleChange}>
                      <option>Not Run</option>
                      <option>Passed</option>
                      <option>Failed</option>
                    </select>
                  </td>
                  <td>
                    <select name="priority" value={editedData.priority || ''} onChange={handleChange}>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </td>
                  <td><input name="tester" value={editedData.tester || ''} onChange={handleChange} /></td>
                  <td>{new Date(tc.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={handleSave}>💾 Save</button>
                    <button onClick={cancelEditing}>❌ Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{tc.title}</td>
                  <td>{tc.module}</td>
                  <td>{tc.preconditions}</td>
                  <td>{tc.steps}</td>
                  <td>{tc.expectedResult}</td>
                  <td>{tc.actualResult}</td>
                  <td>{tc.status}</td>
                  <td>{tc.priority}</td>
                  <td>{tc.tester}</td>
                  <td>{new Date(tc.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => startEditing(tc)}>✏️ Edit</button>
                    <button onClick={() => onDelete(tc.id)}>🗑️ Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TestCaseTable;

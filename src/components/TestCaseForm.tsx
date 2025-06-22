import { useState } from 'react';
import type { TestCase } from '../types/TestCase';
import './TestCaseForm.css';

interface Props {
  onAddTestCase: (testCase: TestCase) => void;
}

function TestCaseForm({ onAddTestCase }: Props) {
  const [formData, setFormData] = useState<Omit<TestCase, 'id' | 'createdAt'>>({
    title: '',
    module: '',
    preconditions: '',
    steps: '',
    expectedResult: '',
    actualResult: '',
    status: 'Not Run',
    priority: 'Medium',
    tester: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTestCase: TestCase = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    onAddTestCase(newTestCase);
    setFormData({
      title: '',
      module: '',
      preconditions: '',
      steps: '',
      expectedResult: '',
      actualResult: '',
      status: 'Not Run',
      priority: 'Medium',
      tester: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="testcase-form">
      <div className="form-row">
        <label>Title</label>
        <input name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label>Module</label>
        <input name="module" value={formData.module} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label>Preconditions</label>
        <textarea name="preconditions" value={formData.preconditions} onChange={handleChange} />
      </div>
      <div className="form-row">
        <label>Steps</label>
        <textarea name="steps" value={formData.steps} onChange={handleChange} />
      </div>
      <div className="form-row">
        <label>Expected Result</label>
        <textarea name="expectedResult" value={formData.expectedResult} onChange={handleChange} />
      </div>
      <div className="form-row">
        <label>Actual Result</label>
        <textarea name="actualResult" value={formData.actualResult} onChange={handleChange} />
      </div>
      <div className="form-row">
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Not Run</option>
          <option>Passed</option>
          <option>Failed</option>
        </select>
      </div>
      <div className="form-row">
        <label>Priority</label>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <div className="form-row">
        <label>Tester</label>
        <input name="tester" value={formData.tester} onChange={handleChange} />
      </div>
      <div className="form-actions">
        <button type="submit">➕ Add Test Case</button>
      </div>
    </form>
  );
}

export default TestCaseForm;

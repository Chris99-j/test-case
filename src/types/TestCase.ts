export interface TestCase {
  id: string;
  title: string;
  module: string;
  preconditions: string;
  steps: string;
  expectedResult: string;
  actualResult: string;
  status: 'Not Run' | 'Passed' | 'Failed';
  priority: 'Low' | 'Medium' | 'High';
  tester: string;
  createdAt: string;
}
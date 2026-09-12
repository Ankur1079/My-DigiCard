import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardPreview } from '../components/CardPreview';
import type { ProfileData } from '../types';

const mockData: ProfileData = {
  name: 'Ankur Yadav',
  pronouns: '',
  title: 'Full-Stack Developer',
  company: '',
  location: '',
  avatarUrl: '',
  summary: 'Building full-stack and DevOps projects.',
  skills: ['React', 'TypeScript'],
  socials: {
    email: 'ankur@example.com',
    phone: '',
    github: 'Ankur1079',
    linkedin: '',
    twitter: '',
    portfolio: 'https://example.com',
    customUrl: '',
    customLabel: '',
    resumeUrl: '',
  },
  useInteractiveResume: true,
  experiences: [],
  educations: [],
  projects: [],
  certifications: [],
};

describe('CardPreview', () => {
  let writeTextMock: jest.Mock;

  beforeEach(() => {
    writeTextMock = jest.fn().mockImplementation(() => Promise.resolve());
    
    // Mock navigator.clipboard safely across environments
    Object.defineProperty(window.navigator, 'clipboard', {
      writable: true,
      configurable: true,
      value: {
        writeText: writeTextMock,
      },
    });

    // Mock execCommand fallback
    document.execCommand = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the name and title', () => {
    render(<CardPreview data={mockData} onViewResume={() => {}} />);
    expect(screen.getByText('Ankur Yadav')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Developer')).toBeInTheDocument();
  });

  it('renders each skill as a badge', () => {
    render(<CardPreview data={mockData} onViewResume={() => {}} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('links the GitHub icon to the correct profile URL', () => {
    render(<CardPreview data={mockData} onViewResume={() => {}} />);
    expect(screen.getByTitle('GitHub Profile')).toHaveAttribute(
      'href',
      'https://github.com/Ankur1079'
    );
  });

  it('calls onViewResume when the Resume button is clicked', async () => {
    const user = userEvent.setup();
    const onViewResume = jest.fn();
    render(<CardPreview data={mockData} onViewResume={onViewResume} />);
    await user.click(screen.getByText('Resume'));
    expect(onViewResume).toHaveBeenCalledTimes(1);
  });

  it('toggles the theme label when the theme button is clicked', async () => {
    const user = userEvent.setup();
    const onThemeToggle = jest.fn();
    render(
      <CardPreview
        data={mockData}
        onViewResume={() => {}}
        theme="light"
        onThemeToggle={onThemeToggle}
      />
    );
    await user.click(screen.getByText('Dark'));
    expect(onThemeToggle).toHaveBeenCalledTimes(1);
  });

  it('copies email to clipboard when copy button is clicked', async () => {
    render(<CardPreview data={mockData} onViewResume={() => {}} />);
    
    // Use fireEvent for synchronous DOM click handling to bypass userEvent virtual clipboard interception
    const copyBtn = screen.getByTitle('Copy email to clipboard');
    fireEvent.click(copyBtn);

    expect(writeTextMock).toHaveBeenCalledWith('ankur@example.com');
  });
});
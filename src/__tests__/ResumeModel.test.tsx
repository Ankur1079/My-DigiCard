import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResumeModal } from '../components/ResumeModal';
import type { ProfileData } from '../types';

const mockData: ProfileData = {
  name: 'Ankur Yadav',
  pronouns: '',
  title: 'Full-Stack Developer',
  company: 'Freelance',
  location: 'Kolkata, India',
  avatarUrl: '',
  summary: 'Building full-stack and DevOps projects.',
  skills: ['React', 'TypeScript'],
  socials: {
    email: 'ankur@example.com',
    phone: '',
    github: 'https://github.com/Ankur1079',
    linkedin: '',
    twitter: '',
    portfolio: 'https://example.com',
    customUrl: '',
    customLabel: '',
    resumeUrl: '',
  },
  useInteractiveResume: true,
  experiences: [
    { id: '1', role: 'Backend Dev', company: 'Acme', period: '2025-2026', description: 'Built APIs.' },
  ],
  educations: [
    { id: '1', degree: 'B.Tech CS', school: 'Sister Nivedita University', period: '2023-2027' },
  ],
  projects: [
    { id: '1', title: 'My-DigiCard', description: 'A digital business card app.', link: 'https://github.com/Ankur1079/My-DigiCard' },
  ],
  certifications: [],
};

describe('ResumeModal', () => {
  let writeTextMock: jest.Mock;

  beforeEach(() => {
    writeTextMock = jest.fn().mockImplementation(() => Promise.resolve());

    Object.defineProperty(window.navigator, 'clipboard', {
      writable: true,
      configurable: true,
      value: {
        writeText: writeTextMock,
      },
    });

    document.execCommand = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <ResumeModal isOpen={false} onClose={() => {}} data={mockData} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders resume content when isOpen is true', () => {
    render(<ResumeModal isOpen={true} onClose={() => {}} data={mockData} />);
    expect(screen.getAllByText('Ankur Yadav')[0]).toBeInTheDocument();
    expect(screen.getByText(/Interactive Resume Viewer/)).toBeInTheDocument();
    expect(screen.getByText('Backend Dev', { exact: false })).toBeInTheDocument();
  });

  it('renders project and education entries', () => {
    render(<ResumeModal isOpen={true} onClose={() => {}} data={mockData} />);
    expect(screen.getByText('My-DigiCard')).toBeInTheDocument();
    expect(screen.getByText('B.Tech CS')).toBeInTheDocument();
  });

  it('calls onClose when the close (X) button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(<ResumeModal isOpen={true} onClose={onClose} data={mockData} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[buttons.length - 1]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('copies formatted plaintext resume to clipboard', () => {
    render(<ResumeModal isOpen={true} onClose={() => {}} data={mockData} />);
    
    const copyButton = screen.getByText('Copy Raw Text');
    fireEvent.click(copyButton);

    expect(writeTextMock).toHaveBeenCalledTimes(1);
    const copiedText = writeTextMock.mock.calls[0][0];
    expect(copiedText).toContain('ANKUR YADAV');
    expect(copiedText).toContain('Backend Dev');
  });
});
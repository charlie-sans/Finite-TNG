
import React from 'react';
const TeamMembers = [
    { name: 'Charlie santana', role: 'CEO, Lead Developer, Owner of Finite', avatar: 'https://avatars.githubusercontent.com/u/118048881?v=4' },
    { name: 'Intervinn', role: 'Lead Developer', avatar: 'https://avatars.githubusercontent.com/u/69168328?v=4' },
    { name: 'H4RL', role: 'Software Developer', avatar: 'https://avatars.githubusercontent.com/u/98224660?v=4' },
]

// style jsx
const styles = {
    teamMembers: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    teamMember: {
        width: '200px',
        margin: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        padding: '20px',
    },
    avatar: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        marginBottom: '10px',
    },
    name: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    role: {
        fontSize: '14px',
        color: '#555',
    },
};
const TeamPage = () => {
  return (
    <div>
      <h1>Team Page</h1>
      <p>Meet our amazing team members who make everything possible!</p>
      <div className="team-members" style={styles.teamMembers}>
        {TeamMembers.map((member, index) => (
          <div key={index} className="team-member" style={styles.teamMember}>
            <img src={member.avatar} alt={member.name} style={styles.avatar} />
            <h2 style={styles.name}>{member.name}</h2>
            <p style={styles.role}>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;

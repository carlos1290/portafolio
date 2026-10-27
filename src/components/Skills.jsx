const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Git',
  'SQL',
  'REST APIs',
]

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <h2 className="section-title">Tecnologías</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <span key={skill} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

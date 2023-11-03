import React from 'react'

function About() {
  return (
    <div>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <strong>About eNotebook</strong>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
            Welcome to <strong>eNotebook</strong> – the digital canvas for your every thought, idea, and inspiration. Born from the need to make note-taking more intuitive, efficient, and versatile, eNotebook offers an experience that blends the tactile satisfaction of traditional pen-and-paper with the convenience of cutting-edge digital technology.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <strong>Features</strong>
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>• Safe and Secure:</strong> eNotebook employs top-notch encryption protocols, making sure your ideas remain private and protected. <br></br><br></br>
              <strong>• Anywhere Access:</strong> Your notes are available to you on any device, anywhere, ensuring you always have your thoughts and ideas with you.<br></br><br></br>
              <strong>• Eco-friendly:</strong> Say goodbye to paper waste and embrace a sustainable way to keep your notes.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <strong>More..</strong>
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
            <strong>Our mission with eNotebook</strong> is not just to provide a digital notepad, but to redefine the very way you capture, organize, and reflect on your thoughts. Join us in this journey and see where your ideas take you!<br></br><br></br>
            © Harikrishnan V B
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

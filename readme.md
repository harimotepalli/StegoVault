# StegoVault

StegoVault is an advanced image steganography web application built with React and JavaScript. It allows you to securely **hide secret messages inside images** and **extract messages** using local browser processing with an optional password protection feature.

---

## Features

- **Hide Secret Messages:** Embed text messages seamlessly into cover images.
- **Extract Messages:** Reveal hidden messages from stego images.
- **Password Protection:** Optionally encrypt messages with a password.
- **Local Processing:** No data is sent outside your browser — full privacy.
- **Supports various image formats:** PNG, JPG, GIF, up to 10MB.
- **User-friendly UI:** Built with React and Tailwind CSS.
- **Open Source:** Fully open, easy to extend and audit.

---

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node)

### Installation

1. Clone the repository:

git clone https://github.com/your-username/stegovault.git
cd stegovault

text

2. Install dependencies:

npm install

text

### Running the App

Start the development server:

npm run dev

text

Open [http://localhost:5173](http://localhost:5173) in your browser to see the app.

---

## Project Structure

src/
├── components/ # React components
│ ├── MessageEncoder.jsx
│ ├── MessageDecoder.jsx
│ ├── ImageUpload.jsx
│ ├── Navigation.jsx
│ └── Footer.jsx
├── utils/
│ └── steganography.js # Main steganography logic (encode, decode, capacity)
├── styles/
│ └── index.css # Global styles
├── App.jsx # Root component
└── main.jsx # Entry point

text

---

## Converting from TypeScript to JavaScript

This project was originally built in TypeScript and migrated to JavaScript.  
TypeScript-specific parts such as interfaces, type annotations, and `.ts` file extensions were removed.

---

## Usage

### Hide Message (Encoding)

- Upload a cover image.
- Enter the secret message text.
- (Optional) Select password protection and enter a password.
- Click "**Hide Message**" to encode.
- Download the encoded image.

### Extract Message (Decoding)

- Upload a stego image that contains a hidden message.
- (If password protected) Enable password and input the password.
- Click "**Extract Message**" to decode.
- View or copy the revealed message.

---

## Configuration

### Vite

The development server uses Vite. Configuration is located in `vite.config.js`.

### ESLint

ESLint is configured for JavaScript and React using `eslint.config.js`. All TypeScript linting has been removed.

---

## Dependencies

- React
- Lucide-react (icons)
- Tailwind CSS
- Vite (build and dev)

See `package.json` for full dependency list.

---

## Contributing

Contributions are welcome! Please submit issues or pull requests via GitHub.

---

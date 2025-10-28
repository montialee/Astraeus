# Asteria - Advanced Astrophotography Planning Application

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Website](https://img.shields.io/badge/Website-Live-green.svg)](https://astraea.app)

**Plan the Perfect Astrophotography Shot**

Asteria is an advanced mobile application designed for astrophotographers who demand precision, intelligence, and seamless planning capabilities. Built on scientific foundations and powered by real-time celestial mechanics, AR technology, and intelligent algorithms.

---

## 🌟 MVP Website

This repository contains the MVP landing page for Asteria, showcasing the application's core features and value proposition to early adopters.

### Features of the Landing Page

- **Dark Theme First**: Optimized for astronomy enthusiasts with a red/deep gray color palette
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Interactive Elements**: Smooth scrolling, form validation, and animated components
- **Waitlist Integration**: Early access signup with email validation
- **Feature Showcase**: Comprehensive overview of all planned capabilities
- **Technology Stack**: Transparent display of data sources and frameworks

---

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Asteria.git
   cd Asteria
   ```

2. **Open in browser**
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve

   # Or simply open index.html in your browser
   open index.html
   ```

3. **View the site**
   Navigate to `http://localhost:8000` (or just open `index.html` directly)

### Project Structure

```
Asteria/
├── index.html          # Main landing page
├── styles.css          # Dark theme styling and animations
├── script.js           # Interactive features and form handling
└── README.md           # Project documentation
```

---

## 🎯 Core Application Features (Planned)

### 1. **FoV Framing Intelligence**
- Input camera sensor size and focal length
- Algorithmic scoring and ranking of targets
- Find objects that perfectly frame in your equipment

### 2. **Advanced Multi-Filter System**
- Filter by altitude, angular size, moon separation
- Object type and sky quadrant selection
- Instant results for your specific conditions

### 3. **Real-Time Celestial Mechanics**
- Altitude/azimuth paths and transit times
- Sub-arcminute accuracy via Astronomy Engine
- Completely offline-capable

### 4. **AR Horizon Scanner**
- Map local obstructions with augmented reality
- See when targets clear trees, buildings, terrain
- Save custom horizon profiles per location

### 5. **Landscape Alignment Calculator**
- Pin foreground objects on map
- Calculate exact GPS position for perfect alignment
- Reverse line-of-sight geodetic algorithm

### 6. **Astronomy-Specific Weather**
- Seeing and transparency metrics via Astrospheric
- Cloud cover data that matters
- Multi-day forecasting

### 7. **Light Pollution Mapping**
- Custom backend service with real data
- Bortle class and SQM readings
- Location-based darkness assessment

### 8. **Personal Target Management**
- Track captured objects
- Maintain priority wishlist
- Adaptive UI based on progress

---

## 🛠 Technology Stack

### Mobile Application (Planned)
- **Platform**: Native iOS (Swift) and Android (Kotlin)
- **AR Frameworks**: ARKit (iOS) and ARCore (Android)
- **Ephemeris Engine**: [Astronomy Engine](https://github.com/cosinekitty/astronomy) by CosineKitty
- **Database**: SQLite with cloud sync

### Backend Infrastructure (Planned)
- **Framework**: Python (Django or FastAPI)
- **Database**: PostgreSQL with PostGIS extension
- **Scientific Libraries**: Astropy, astroquery
- **Hosting**: Cloud-based with CDN for static assets

### Data Sources
| Source | Purpose | Parameters |
|--------|---------|------------|
| **SIMBAD** | Astronomical object catalog | RA/Dec, Type, Magnitude, Parallax |
| **Astronomy Engine** | Celestial calculations | Alt/Az, Rise/Set, Transit times |
| **Astrospheric API** | Weather forecasting | Seeing, Transparency, Cloud cover |
| **Light Pollution Atlas** | Sky darkness data | Bortle class, SQM values |

---

## 📱 Landing Page Features

### Design Principles
- **Dark Mode First**: Red/gray palette to preserve night vision
- **Clarity & Simplicity**: Strong visual hierarchy, minimal clutter
- **Map-Centric**: Visual planning takes priority
- **Touch-Friendly**: Large targets for field conditions

### Interactive Components
- **Smooth Navigation**: Seamless scrolling between sections
- **Animated Cards**: Staggered fade-in animations
- **Star Field**: Dynamic background with shooting stars
- **Form Validation**: Real-time email verification
- **Local Storage**: Waitlist persistence (MVP demo)

### Sections
1. **Hero**: Compelling value proposition with key stats
2. **Features**: 8 detailed feature cards with icons
3. **Technology**: Data sources and architecture overview
4. **Workflow**: 4-step planning process
5. **Early Access**: Waitlist signup with benefits
6. **Footer**: Brand info and navigation links

---

## 🔮 Roadmap

### Phase 1: MVP Website (Current)
- [x] Landing page design and development
- [x] Feature showcase and value proposition
- [x] Waitlist/early access signup
- [x] Responsive design for all devices

### Phase 2: Backend Development
- [ ] Set up PostgreSQL with PostGIS
- [ ] Build SIMBAD data ingestion pipeline
- [ ] Implement angular size calculation algorithm
- [ ] Create light pollution mapping service
- [ ] Develop API gateway for third-party services

### Phase 3: Mobile App Core
- [ ] Native iOS and Android project setup
- [ ] Integrate Astronomy Engine
- [ ] Build interactive sky chart component
- [ ] Implement filtering and search system
- [ ] Develop FoV framing algorithm

### Phase 4: Advanced Features
- [ ] AR horizon scanning implementation
- [ ] Landscape alignment calculator
- [ ] Weather integration
- [ ] User authentication and sync

### Phase 5: Beta & Launch
- [ ] Beta testing with astrophotography community
- [ ] Performance optimization
- [ ] App Store submission
- [ ] Public launch

---

## 🤝 Contributing

Asteria is currently in early development. If you're interested in contributing:

1. **Join the Waitlist**: Sign up for early access on our landing page
2. **Provide Feedback**: Share your astrophotography workflow and pain points
3. **Beta Testing**: Help us test features when beta program launches
4. **Spread the Word**: Share Asteria with fellow astrophotographers

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

- **Website**: [astraea.app](https://astraea.app) (coming soon)
- **Email**: hello@astraea.app
- **Twitter**: [@AsteriaApp](https://twitter.com/AsteriaApp)
- **GitHub**: [github.com/yourusername/Asteria](https://github.com/yourusername/Asteria)

---

## 🙏 Acknowledgments

- **SIMBAD Database**: Centre de données astronomiques de Strasbourg (CDS)
- **Astronomy Engine**: CosineKitty for the exceptional ephemeris library
- **Astrospheric**: For astronomy-specific weather data
- **Light Pollution Atlas**: For darkness mapping data
- **Astrophotography Community**: For inspiration and feedback

---

## 📚 References

### Architectural Blueprint
This MVP website is based on a comprehensive architectural blueprint that details:
- Hybrid client-server model design
- Data ingestion and enrichment pipelines
- Advanced filtering algorithms
- AR implementation strategies
- UI/UX principles for data-rich astronomy applications

For the full technical specification, see the [ARCHITECTURE.md](ARCHITECTURE.md) document.

---

**Built with precision for astrophotographers worldwide** ✨

*Asteria - From Greek mythology: The Titan goddess of falling stars, nocturnal oracles and astrology*

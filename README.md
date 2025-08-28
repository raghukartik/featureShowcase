# 📱 Feature Showcase  

A responsive and interactive **Feature Showcase section** built with React + Tailwind.  
This component mimics an app demo experience by pairing an iPhone mockup with dynamic text and interactive navigation.  

---

## ✨ Features  

- **Interactive Clickable Points**  
  - Points on the right side are clickable.  
  - Clicking sets an **active state** (blue indicator).  
  - Updates the **iPhone image, heading, and body text** on the left.  

- **Arrow Navigation**  
  - Left/Right arrows allow navigation between features.  
  - Content updates seamlessly when switching.  

- **Sticky Scroll Section**  
  - Section becomes **sticky when in view**.  
  - User scrolls through features (1 → 5) automatically.  
  - After the last feature, normal page scrolling resumes.  

- **Auto-Scroll**  
  - Features auto-advance every **1.5 seconds**.  
  - Loops through features 1 → 5, then continues natural scrolling.  

- **Responsive Design**  
  - **Desktop**: iPhone on middle, clickable points on right.  
  - **Mobile**: Stack layout with proper spacing and tap-friendly interactions.  

---

## 🚀 Usage  

1. Import the `FeatureShowcase` component into your React project.  
2. Add it to your page/landing section.  
3. Features auto-play + manual navigation included.  

```jsx
import FeatureShowcase from "./components/FeatureShowcase";

function App() {
  return (
    <div>
      <FeatureShowcase />
    </div>
  );
}
```

---

## 🛠 Tech Stack  

- **React** – Component-based UI  
- **Tailwind CSS** – Styling & layout  

---

## 📱 Demo Flow  

1. User lands on the section → it **sticks** in place.  
2. Features auto-scroll every **1.5s**.  
3. User can also **click points** or use **arrows**.  
4. After the last feature, normal scrolling resumes.  

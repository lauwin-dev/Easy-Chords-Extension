# Privacy Policy - Easy Chords Extension

**Last Updated: May 2026**

## 1. Introduction
This privacy policy explains how the "Easy Chords Extension" handles user data. Our goal is to provide a simplified chords viewing experience while maintaining the highest level of user privacy.

## 2. Data Collection and Usage
Based on the extension's technical implementation in `script.js`:
*   **Personal Information:** The extension **does not** collect, store, or transmit any personally identifiable information (PII) such as names, email addresses, or IP addresses.
*   **Technical Data:** The extension only processes the current website URL to append the `chordType=simple` parameter when the user activates the "Easy Chords" mode[cite: 1].

## 3. Storage
*   The extension uses `chrome.storage.local` to save the user's preference (whether the "Auto Simple Chords" mode is ON or OFF)[cite: 1].
*   This data is stored **locally** on the user's device and is not shared with the developer or any third-party servers[cite: 1].

## 4. Third-Party Sharing
*   We **do not** sell, trade, or share any user data with third parties[cite: 1].
*   The extension performs all UI cleaning and DOM manipulations (removing locked video overlays or purchase buttons) locally within the user's browser[cite: 1].

## 5. Permissions Justification
*   **Storage:** Required to remember user settings across sessions[cite: 1].
*   **Host Permissions:** Required to modify the interface of the target website to provide a cleaner view[cite: 1].

## 6. Contact
For any questions regarding this privacy policy, please contact the developer through the GitHub repository.
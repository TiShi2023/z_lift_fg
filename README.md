# Alarm Monitor (z_lift_fg)

An alarm monitoring dashboard built with [Next.js](https://nextjs.org), designed for high-contrast operations monitoring.

## Features

- **Dual View Modes**:
  - **Detail View**: 2-column grid with video playback and detailed metadata.
  - **Grid View**: High-density thumbnail grid with full timestamps and click-to-play modal.
- **Infinite Scroll**: Seamlessly loads more alarms as you scroll.
- **Responsive Design**: Optimized for various screen sizes.

## Environment Variables

This project requires the following environment variables to be set:

| Variable | Description |
|---|---|
| `API_BASE_URL` | The endpoint URL for fetching the alarm list (e.g., `https://third-party-api.ti-lian.com/local/v1/findAlarmList`) |

## Getting Started

1.  Clone the repository:
    ```bash
    git clone git@github.com:TiShi2023/z_lift_fg.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables:
    Create a `.env.local` file in the root directory and add:
    ```env
    API_BASE_URL=https://third-party-api.ti-lian.com/local/v1/findAlarmList
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

## Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com).

1.  **Push to GitHub**: Ensure your code is pushed to your GitHub repository (already configured).
2.  **Import Project**:
    - Log in to Vercel.
    - Click **"Add New..."** -> **"Project"**.
    - Select your GitHub repository: `TiShi2023/z_lift_fg`.
3.  **Configure Environment Variables**:
    - In the "Configure Project" screen, expand the **Environment Variables** section.
    - Add the following variable:
        - **Key**: `API_BASE_URL`
        - **Value**: `https://third-party-api.ti-lian.com/local/v1/findAlarmList`
4.  **Deploy**: Click **"Deploy"**. Vercel will build and deploy your application.


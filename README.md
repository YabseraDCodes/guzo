# GUZO — Open-Source Tourism Platform for Africa

Guzo is an open-source tourism discovery and management platform that helps travellers explore African countries, discover tours, compare travel agencies and packages, and book trips directly. It also provides administrative dashboards for agencies to manage their tours, packages, and customer bookings.

Built with Next.js, TypeScript, and Supabase, Guzo is designed as a reusable template that tourism businesses and developers can adapt, configure, and extend to suit their needs. It is not tied to a specific country or travel agency.

**Discover Africa. Live the Journey.**

## Features

- **Country Discovery:** Explore countries and their tourist attractions.
- **Tour Catalogue:** Browse tours, itineraries, durations, and highlights.
- **Travel Agency Profiles:** Discover agencies offering available tours.
- **Tour Packages:** Compare agency-specific packages, prices, durations, and included services.
- **Direct Booking:** Select a tour, agency, and package, then submit a booking online.
- **Booking Management:** Track booking status and allow authorized agency staff to manage bookings.
- **Search and Filtering:** Find countries, tours, agencies, and packages.
- **Role-Based Access Control:** Protect administrative features based on user roles.
- **Admin Dashboard:** Manage platform information and tourism operations.
- **Responsive Design:** Access the platform across desktop and mobile devices.

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Validation:** Zod
- **Package Manager:** npm
- **Version Control:** Git and GitHub
- **Deployment:** Vercel

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (a version compatible with your Next.js project)
- npm
- Git
- A Supabase project

### 1. Clone the repository

bash

```
git clone <your-repository-url>
cd guzo
```

Replace `<your-repository-url>` with the actual URL of your GitHub repository.

### 2. Install dependencies

bash

```
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project's root directory and add your Supabase project credentials:

env

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Replace the placeholder values with the appropriate values from your Supabase project and local development environment.

**Important notes:**

- `NEXT_PUBLIC_SUPABASE_URL` identifies your Supabase project.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are public client keys. Both are currently included in the configuration; consolidate them when the application no longer needs both.
- `SUPABASE_SERVICE_ROLE_KEY` is a sensitive server-side credential. Never expose it through client-side code, browser responses, public repositories, or variables prefixed with `NEXT_PUBLIC_`.
- `NEXT_PUBLIC_BASE_URL` specifies the application's base URL. Use the appropriate production URL when deploying.

Ensure `.env.local` is included in `.gitignore`. Never commit real credentials or secret keys to GitHub.

### 4. Start the development server

bash

```
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Configure Supabase

Make sure your Supabase project is configured with the database schema, authentication settings, and any required sample data for the application.

The required database tables, relationships, and policies must match the application's implementation. Consult the project's database setup files and migrations, if available, before deploying to a new Supabase project.

## How It Works

Guzo connects travellers with tourism businesses through a straightforward booking workflow:

1. **Explore countries:** Browse available countries and their attractions.
2. **Discover tours:** View tours offered within a selected country.
3. **Compare agencies:** Find agencies offering the selected tour.
4. **Compare packages:** Review the selected agency's available packages and offerings.
5. **Book a trip:** Choose a package and submit the required customer and travel details.
6. **Track the booking:** View the booking confirmation and current status.
7. **Manage bookings:** Authorized agency staff review bookings and update their status through the administrative dashboard.

Submitting a booking does not automatically confirm the trip. The responsible agency reviews the booking and updates its status. Online payment processing is not currently supported.

## User Roles

### Travellers

- Explore countries and tours.
- Compare agencies and tour packages.
- Submit bookings directly.
- View booking details and status.

### Agency Staff

- Manage their agency's tourism offerings and packages.
- View bookings associated with their agency.
- Access the customer and travel information needed to coordinate bookings.
- Review bookings and update their status.

### Platform Administrators

- Manage platform-wide tourism information.
- Oversee agencies and administrative accounts.
- Manage platform data and bookings according to their permissions.

## Deployment

Guzo can be deployed to [Vercel](https://vercel.com/).

For deployment:

1. Import the repository into Vercel.
2. Configure the required environment variables in the project's settings.
3. Ensure the production Supabase database, authentication configuration, and security policies are correctly configured.
4. Set `NEXT_PUBLIC_BASE_URL` to the appropriate production URL.
5. Deploy and verify the main user flows, authentication, booking workflow, and administrative permissions.

Do not add service-role credentials to client-side configuration or expose them in public build output.

## Open Source and Customization

Guzo is an independent, open-source project intended to serve as a foundation for tourism websites and management systems.

It is not restricted to a specific country, agency, or tourism business. Developers and businesses can adapt the project to their own destinations, branding, packages, workflows, and operational requirements.

Possible future extensions include online payments, advanced availability management, agency verification, analytics, and additional booking automation.

## Project Status

Guzo is nearing completion, with final polishing and testing underway.

The project is being developed with an emphasis on practical functionality, maintainable code, secure access control, and a straightforward booking experience.

## Contributing

Contributions, bug reports, and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Submit a pull request describing your changes.

Please avoid committing credentials, review security implications when modifying authentication or authorization, and test changes before submitting them.

## License

The project license has not yet been finalized. A license will be selected and added to the repository before the first public release.

Until a license is added, do not assume that the code is available for unrestricted reuse, redistribution, or modification.

---

**Guzo — Discover Africa. Live the Journey.**

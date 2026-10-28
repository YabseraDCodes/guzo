# GUZO — Project Documentation

**Tagline:** Discover Africa. Live the Journey.  
**Document status:** Initial draft for team review  
**Project type:** Open-source tourism website and management platform

> **Scope note:** This document is based on the GUZO project description shared by the team. It describes the intended product and workflow, not a claim that every feature is already implemented. Items needing confirmation are listed at the end.

## 1. Project Overview

### What is Guzo?

Guzo is an open-source tourism platform intended to help travellers discover African destinations, compare tours and travel agencies, review packages, and submit bookings through one website. It also aims to give travel agencies tools to present their services and manage tour packages and customer bookings. Platform administrators are intended to maintain shared platform information and manage staff accounts and permissions.

Guzo is an independent project intended to demonstrate practical software engineering while building a platform that could be useful to tourism businesses.

### Problem Guzo aims to solve

Travellers may find it difficult to locate clear information about destinations, compare tours from different agencies, and understand package prices and services before making a decision. Travel agencies need a convenient way to showcase their services and keep track of bookings.

Guzo aims to connect these needs through a public tourism website and administrative dashboards.

### Main users

- **Travellers:** Discover countries and attractions, browse tours, compare agencies and packages, and submit bookings.
- **Travel agency staff:** Manage their agency information, tour offerings, packages, and bookings associated with their agency.
- **Platform administrators:** Maintain destination and tour information, manage agency and staff accounts, oversee bookings, and help keep platform data accurate.

### Project team and responsibilities

Guzo was developed as a team project by five members. The responsibilities below describe each member's assigned contribution; they do not imply that every planned feature is complete.

- **Eyob — Backend architecture and dashboards:** Develop the backend architecture, design and implement APIs, and build staff and admin dashboards for managing system operations, user activities, tour data, and administrative tasks.
- **AmdeBrhan — Booking system:** Develop the booking page, including form validation and booking confirmation functionality, and build an admin dashboard for managing bookings, monitoring booking statuses, and maintaining accurate booking records.
- **Luwam — Home and destination UI:** Design and develop the frontend UI for the Home and Destination pages, focusing on a visually appealing, responsive, user-friendly, and consistent experience across the application.
- **Sofoniyas — Tour cards and destination details:** Design and develop tour cards and destination detail pages, including tour status confirmation, data collection, and database integration for storing and managing tour-related information.
- **Yabsera — Project lead and authentication:** Lead and oversee the software development project, contribute across different areas as needed, and work on authentication.

### Core features described in the project plan

1. **Country discovery:** Browse African countries and view individual country information.
2. **Tour catalogue and details:** Explore tours available in a country and view tour descriptions, itineraries, durations, and highlights.
3. **Agency profiles and comparison:** See agencies offering a selected tour and compare their services and offerings.
4. **Tour packages:** Review agency-specific packages, including planned details such as price, duration, itinerary, accommodation, and included services.
5. **Search and filtering:** Search or filter countries, tours, agencies, and packages.
6. **Direct booking:** Select a country, tour, agency, and package, then submit travel and contact details without a separate inquiry step.
7. **Booking confirmation and status:** View submitted booking details and its status. A submitted booking is not automatically confirmed; the responsible agency reviews it.
8. **Agency management dashboard:** Intended tools for agency staff to manage tours, packages, and bookings, and to update booking status.
9. **Platform administration:** Intended tools for managing countries, tours, agencies, staff accounts, roles, permissions, and platform-wide bookings.
10. **Authentication:** Authentication is part of the team's planned work; the exact sign-in method and implemented user roles should be confirmed.
11. **Responsive website:** The project plan calls for a website that works across different screen sizes.

These are features in the project description. Their current implementation status should be checked with the team before this document is treated as a final description of the running application.

## 2. Booking Workflow

The planned booking journey is as follows.

1. **Select a country.** The traveller browses the country catalogue and chooses a destination country.
2. **Explore tours.** The traveller browses tours in that country and opens a tour details page.
3. **Compare agencies.** The website presents agencies that offer the selected tour and relevant information about their services.
4. **Choose an agency.** The traveller selects an agency based on the information available.
5. **Compare packages.** The traveller reviews packages offered by that agency for the selected tour, including available price, duration, itinerary, accommodation, and included services.
6. **Select a package.** The traveller chooses the package that best fits their needs and budget.
7. **Enter travel details.** The traveller fills in the booking form with required contact information, preferred dates, number of travellers, and other requested details.
8. **Submit the booking.** The system is intended to validate the submitted information and save the booking with an initial status.
9. **View confirmation.** The traveller sees a confirmation page with the selected trip information, travel details, and booking status.
10. **Agency reviews the booking.** Authorized staff from the selected agency view the booking in their dashboard and update its status.

### How the agency receives and manages a booking

According to the project plan, each booking is associated with the selected tour, agency, and package. This relationship lets the responsible agency find the booking and access the customer and travel details needed to coordinate the trip. Authorized agency staff are intended to review the booking and confirm, reject, or otherwise update its status.

Submitting a booking does **not** automatically mean the trip is confirmed. The agency must review it and update the status. The exact status names and any notification method have not been confirmed in the supplied project description.

## 3. Booking Flowchart

The following Mermaid flowchart can be viewed in Markdown viewers that support Mermaid, including compatible GitHub Markdown views.

```mermaid
flowchart TD
    A([Start]) --> B[Browse countries]
    B --> C[Select a country]
    C --> D[Explore tours in that country]
    D --> E[Open a tour details page]
    E --> F[Compare agencies offering the tour]
    F --> G[Select an agency]
    G --> H[Compare the agency's packages]
    H --> I[Select a package]
    I --> J[Complete booking form]
    J --> K{Details valid?}
    K -- No --> J
    K -- Yes --> L[Save booking with initial status]
    L --> M[Show booking confirmation and status]
    M --> N[Agency staff review the booking]
    N --> O[Agency updates booking status]
    O --> P([End])

**Important:** This diagram represents the intended workflow in the project description. The precise validation rules, initial status, agency notification mechanism, and final status values need confirmation from the team.

## 4. Technology and Project Structure

The supplied project description identifies the following planned technologies and practices:

- **Next.js and TypeScript:** Application development.
- **Database:** PostgreSQL or MySQL was listed as a decision to be made in the project description.
- **Authentication and role-based access control:** Intended to protect traveller, agency staff, and administrator features.
- **Zod:** Input validation.
- **GitHub:** Version control and team collaboration using branches and pull requests.
- **Vercel:** Planned deployment platform.

The plan describes one shared codebase and shared database supporting multiple agencies. It does not plan separate websites or isolated platform instances for each agency.

**Technical decision to confirm:** The current application code has been reported to use Supabase. The supplied project description still lists PostgreSQL or MySQL as undecided. The team should confirm the actual database and backend setup before this section is finalized.

## 5. Scope and Limitations

The project description explicitly excludes the following from the initial five-day scope:

- Online payment processing or payment gateway integration.
- Complex real-time booking availability across agencies.
- Live chat or messaging.
- Separate websites for individual agencies.
- A mobile application.
- Advanced analytics or recommendation systems.
- Automated integrations with airlines, hotels, or external booking platforms.
- Complex commission calculations or automated financial settlements.
- Advanced agency verification and subscription billing.

These may be considered future improvements, but they should not be described as current features unless the team later confirms that they have been added.

## 6. Definition of Success

According to the project plan, the intended product is successful when:

- A traveller can browse countries and tours.
- The traveller can compare agencies offering a tour and review their packages.
- The traveller can submit a booking for a chosen package.
- The booking is saved with its country, tour, agency, and package relationships and an initial status.
- The traveller can view the booking confirmation and status.
- Authorized agency staff can view bookings for their agency and update their status.
- Platform administrators can manage destination information, tours, agencies, staff accounts, and platform-wide bookings.
- The main booking journey is straightforward and does not require a separate inquiry before booking.

## 7. Questions for the Team

The following points are not fully established by the supplied project description or need to be checked against the current code:

1. **Current implementation:** Which of the planned features are complete, partially complete, or not started?
2. **Database:** Is Supabase the agreed backend/database setup, or is the team still deciding between PostgreSQL and MySQL?
3. **Authentication:** Which sign-in method is being used, and which user roles are currently implemented?
4. **Booking statuses:** What is the initial booking status, and what status values can agency staff choose?
5. **Agency access:** How does agency staff access the dashboard, and how is a booking restricted to the responsible agency?
6. **Notifications:** Does the agency receive a notification when a booking is submitted, or must staff check the dashboard?
7. **Traveller account:** Can travellers book without signing in, or is an account required?
8. **Confirmation:** Is the confirmation page implemented, and can travellers return later to check booking status?
9. **Search and filtering:** Which catalogues currently support search or filters?
10. **Deployment:** Is the application already deployed, and if so, where?
11. **Data accuracy:** Are the destination, tour, agency, and package details real, sample, or a mixture?
12. **Terminology:** Should the interface consistently use “country,” “destination,” “tour,” and “package,” or are any of these terms used differently in the implementation?

## 8. Team Collaboration and Maintenance

The project plan asks the team to work in small, clearly owned tasks, communicate blockers early, and use GitHub branches and pull requests instead of committing directly to the main branch. Shared data structures and relationships should be agreed upon before dependent features are built.

AI tools may support documentation and development, but generated content and code should be understood, tested, and reviewed by the team before merging.

This document is an initial draft. Update it after the team answers the open questions and verifies which planned features are present in the current application.

**Project tagline:** *Guzo: Discover Africa. Live the Journey.*

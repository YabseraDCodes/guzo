# GUZO: African Tourism Discovery and Multi-Agency Booking Platform

## 1. Project overview

GUZO is a web application for discovering tourism experiences across Africa and connecting travelers with travel agencies that provide them. Its central idea combines country and destination discovery, agency-specific tour packages, booking submission, and booking administration in one platform. It is intended to serve both travelers planning a trip and the organizations that publish and fulfill travel offerings.

The source code implements a public-facing discovery and booking experience alongside separate staff and administrator workspaces. Content is retrieved from a Supabase database, while booking records move from traveler submission to agency review and status updates. The platform's continental scope is its organizing vision; the destinations actually displayed depend on the countries, destination records, tours, and agencies configured in the connected database.

## 2. Context, motivation, and objectives

Travel planning often requires people to move between destination research, attraction information, agency websites, package descriptions, and booking communications. GUZO brings these related steps into one destination-centered experience. It gives travelers a path from learning about a place to reviewing available service providers and requesting a package. For agencies, it provides a shared channel to present offers and receive booking requests. For administrators, it provides tools to maintain central catalog information and oversee platform activity.

The project has four practical objectives:

1. Make African destinations and tourism experiences easier to discover.
2. Present offerings from multiple agencies within a common browsing experience.
3. Support booking requests and agency-managed decisions about those requests.
4. Give platform administrators tools to maintain agency, tour, and booking information.

## 3. Platform concept and value

GUZO is conceived as a centralized discovery platform and multi-agency marketplace, rather than a catalog for a single operator. Travelers can begin with a country, continue to places and tours associated with it, then inspect the agencies and package options shown for a selected experience. Agency identity and package details matter because the same experience may be presented by different providers with different prices, durations, accommodation details, itineraries, and inclusions.

This structure lets the traveler evaluate both *what* to do and *who* will provide it. It also connects the discovery side of the product to actual operations: a booking is assigned to an agency, and that agency's staff can review it and update its status. Administrators maintain shared catalog content and can monitor bookings across the platform, while the service provider handles the operational decision on an assigned request.

## 4. Discovery experience

### Homepage

The homepage introduces GUZO, provides a tour search interface, and shows selected country and tour cards. Featured items are drawn from the database-backed country and tour lists. The page links to the full destination and tour catalogs.

### Countries and destinations

The `/destinations` page lists country records and displays a count of related tour records. Selecting a country opens a slug-based detail page with an introduction, imagery, and tours associated with that country. The implementation uses both `countries` and `destinations` data: country records provide the country-level entry point, while destination/tour records contain descriptions, locations, image URLs, slugs, categories, and country relationships. Labels in the interface sometimes call these records tours or destinations, so the precise catalog structure is best understood as a country related to one or more destination/tour entries.

### Tour details and agency offers

A tour detail page shows its name, location, description, and image gallery. It then lists agencies matched to the selected record and renders each agency's available package information. The data shape supports package tiers such as golden, silver, and economy; package information can include price, duration, hotel details, included services, and itinerary stops. These are useful dimensions for comparing providers and deciding which offer fits a traveler's priorities.

The current matching logic associates agencies using the tour/destination identifier in the client-side detail component. The actual breadth and correctness of offers therefore depend on the configured database relationships and records.

## 5. Traveler journey

The implemented traveler flow is:

1. **Discover:** Visit the homepage, browse countries, or search/browse the tour catalog.
2. **Explore a place:** Open a country page and review its description, imagery, and associated tours.
3. **Review an experience:** Open a tour detail page to see the location, description, images, and agencies found for it.
4. **Compare offers:** Inspect the agency cards and package tiers, including the displayed price and package attributes where available.
5. **Request a booking:** Select an agency/package to open the booking page. The traveler enters their name, email, international phone number, traveler count, and travel date. The client-side Zod schema requires a valid future date and between one and twelve travelers.
6. **Receive a booking ID:** The form posts the request to the booking API. On successful insertion, the database returns a booking ID. Confirmation details are kept in the current browser tab's session storage and displayed on a confirmation page.
7. **Check status:** The traveler can visit `/trip-status` and enter the booking ID to see the stored traveler, package, date, and status information.

The booking is a request; submission does not itself confirm the trip. The initial and subsequent status values used by the staff interface are pending, confirmed, and cancelled. The confirmation page is session-dependent: if its session storage data is unavailable, the details cannot be reconstructed there from the booking ID alone.

## 6. Marketplace and package comparison

The marketplace model links tourism experiences to agency records, with packages stored as agency-specific data. A package may describe price, duration, hotel information, included items, and a day-by-day itinerary. This allows two or more providers to present different versions of an experience in a shared context. A traveler can consider cost alongside practical details such as accommodation and activities instead of comparing only agency names.

In the current implementation, package values are collected in an agency creation form and stored as a structured JSON-like object on the agency record. The public pages render the information made available by those records. Dedicated agency self-service controls for editing and publishing packages are not fully implemented; current agency record creation is provided through an administrator-facing form.

## 7. User roles and permissions

### Travelers

Travelers browse public destination and tour content, inspect agency offers, submit booking requests, receive a booking ID, and use that ID to look up booking details and status. The booking flow does not require the traveler to create or sign in to a user account.

### Agency staff

Staff accounts authenticate through Supabase Auth and are associated with a role and, for agency operations, an `agent_id` in the `profiles` table. The staff dashboard is limited to the assigned agency's profile and bookings. Staff can view traveler contact details, package choice, group size, travel date, and request date, then set a booking to pending, confirmed, or cancelled. The update action checks the signed-in staff role, requires an assigned agency, and constrains the update to a booking whose `agent_id` matches that assignment.

The implemented agency responsibility is therefore primarily booking review and status management. The application does not currently provide a complete self-service agency portal for applications, profile management, multi-country operations, or ongoing tour/package editing.

### Administrators

Administrator accounts use the `admin` role. The administrator overview is protected by a role check and links to booking, tour, and agency sections. The interface supports viewing bookings, adding tour/destination records through a form, and adding agency records with package data. Administrators can inspect platform-wide booking information and maintain catalog content. The visible tour and agency lists also show edit/delete controls, but these controls do not currently implement edit or delete operations. There is no country-management interface in the inspected application.

The implemented separation gives administrators a platform oversight role and assigns operational booking decisions to staff for the agency responsible for the offer. That distinction reflects the agency's direct relationship to fulfillment while still allowing administrators to monitor platform activity. In practice, access also depends on Supabase policies and the server-side authorization checks present on each route or action.

## 8. Booking lifecycle and operations

Operationally, the intended and partially implemented lifecycle is:

1. Administrators maintain the available country, destination/tour, and agency data.
2. Agency package details are associated with agency records.
3. Travelers browse the catalog and choose an agency package.
4. The booking form validates required details in the browser and sends a request to the booking API.
5. The API inserts the booking with its agency ID and returns the database-generated booking ID.
6. Agency staff see bookings assigned to their linked agency and review the traveler request.
7. Staff update the request status to pending, confirmed, or cancelled.
8. The traveler looks up the booking using its ID on the trip-status page.
9. Administrators can view the platform booking list and status distribution by filtering the list.

There is no online payment step or automated email notification in this flow. The estimated package total shown during booking is calculated in the browser as the displayed per-traveler price multiplied by traveler count; that total is not stored as a booking charge and no payment is collected.

## 9. Administration and agency onboarding

The application includes administrator-facing creation forms for agencies and tour/destination records. An agency form collects an identifier, a destination association, profile details, contact information, rating, and optional package tiers with hotel details, inclusions, and itinerary. A tour/destination form collects an identifier, country, name, location, description, and image URLs. Booking administration provides a platform-wide table with status filters and refresh behavior.

These are management foundations rather than a complete onboarding workflow. No public agency application, approval queue, verification process, or self-service account creation flow is implemented in the inspected code. Likewise, the agency form associates an agency with one destination, so multi-country agency coverage is not represented as a complete management capability.

## 10. Technical overview and architecture

GUZO is built with Next.js 16 App Router, React 19, and TypeScript 5. Route folders under `src/app` define public pages, dashboards, and API Route Handlers. Server Components are used for page composition and protected staff/admin data access; Client Components are used where forms, browser state, search, filters, or interactive data loading are needed. API handlers under `src/app/api` expose database-backed country, tour, agency, and booking operations.

Supabase provides PostgreSQL data access and authentication. The project uses `@supabase/ssr` and `@supabase/supabase-js`, with separate server and browser clients. A Next.js proxy refreshes the auth session, and login checks the user's `profiles` role before routing to the administrator or staff dashboard. Server-side helpers enforce role checks on protected pages and booking status changes. The staff update operation additionally scopes the booking by the staff profile's assigned agency ID.

The main data concepts visible in queries and types are countries, destinations/tours, agents, profiles, and bookings. Relationships connect destinations to countries, agents to destinations, profiles to roles and optionally agents, and bookings to agents. Package details are represented as structured values associated with agents; booking records contain traveler contact details, selected package name, traveler count, travel date, status, and timestamps. The repository contains no database migration or schema definition files, so the deployed Supabase schema and row-level security policies are external configuration that must match these queries.

Styling is implemented primarily with application CSS and CSS modules. SWR is used for client-side fetching and refresh behavior; Zod validates booking input; `lucide-react` supplies interface icons. The codebase also uses the Next.js Image and Link components. TypeScript is configured in strict mode, although some API handlers use JavaScript/JSX files. No dedicated UI component framework or payment/email provider integration is present in the dependency manifest.

## 11. Implementation status

| Area | Current status |
|---|---|
| Public homepage, country listing, country details, tour listing, and tour details | Implemented, backed by Supabase data |
| Agency and package presentation on tour pages | Implemented for the available agency/package data; completeness depends on configured relationships and records |
| Booking form, client-side validation, database insertion, and confirmation display | Implemented; confirmation details rely on session storage in the same browser tab |
| Booking reference status lookup | Partially implemented: the page searches using the booking ID, but its data source currently returns the full booking list to the browser rather than retrieving only the submitted reference |
| Staff login, assigned-agency dashboard, and status changes | Implemented for staff profiles linked to an agency; database policies must permit the intended access |
| Administrator booking overview | Implemented as a read/monitoring view with status filters |
| Administrator creation of agency and destination/tour records | Forms and insert APIs exist; full editing and deletion are not implemented |
| Country administration | Not present in the inspected application |
| Agency self-service onboarding and multi-country management | Planned/incomplete; current agency creation is administrator-facing and tied to one destination |
| Online payments and automated booking emails | Not implemented |

The public booking lookup behavior is an important limitation of the current implementation. Although the interface asks for a booking ID, `/api/bookinGet` selects booking details without filtering by reference or requiring authentication, and the browser performs the lookup locally. The current implementation therefore does not provide a private, reference-scoped retrieval mechanism. This should be addressed before treating the tracking feature as suitable for production use with real traveler information.

The repository also does not include the database schema/migrations or policies needed to independently reproduce the production data setup. The forms and API routes should be understood as application-level functionality; their effective access restrictions also depend on database-side Supabase configuration.

## 12. Future development

Future work can extend the existing flow while keeping its core model intact:

- **Secure reference lookup:** retrieve a single booking through a server-side endpoint that validates the reference and returns only appropriate fields.
- **Payment integration:** add a payment provider, payment state, and reconciliation flow if the business requires online collection.
- **Email notifications:** send booking acknowledgements and status-change notices through a configured email service.
- **Agency onboarding:** add an application and review process, connect authorized staff accounts to agencies, and support agency profile maintenance.
- **Agency content management:** provide complete create, edit, publish, and archive workflows for tours and package tiers.
- **Multi-country agency coverage:** model agency coverage across multiple countries and destinations rather than a single destination association.
- **Database setup and policies:** version the schema and access policies so deployments can be reproduced and role/data boundaries can be reviewed consistently.

These are possible extensions, not features represented as complete in the current application.

## 13. Conclusion

GUZO brings destination discovery, agency comparison, package selection, booking requests, and agency booking operations into one connected application. Its value comes from connecting travelers' exploration of African places with multiple providers' offers and a defined process for handling the resulting requests. The current code already demonstrates the key public journey and an agency-assigned booking workflow, with administrator tools for basic catalog and booking oversight. Further development—especially secure reference lookup, complete agency self-service, and operational integrations—would strengthen the platform as it moves toward broader real-world use.

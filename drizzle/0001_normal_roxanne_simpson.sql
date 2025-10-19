CREATE TABLE `churchInfo` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`tagline` varchar(500),
	`description` text,
	`address` text,
	`phone` varchar(50),
	`email` varchar(320),
	`logoUrl` text,
	`bannerUrl` text,
	`facebookUrl` text,
	`instagramUrl` text,
	`youtubeUrl` text,
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `churchInfo_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contactMessages` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`subject` varchar(255),
	`message` text NOT NULL,
	`status` enum('new','read','responded') DEFAULT 'new',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `contactMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `donations` (
	`id` varchar(64) NOT NULL,
	`donorName` varchar(255),
	`donorEmail` varchar(320),
	`amount` int NOT NULL,
	`currency` varchar(3) DEFAULT 'USD',
	`purpose` varchar(255),
	`isAnonymous` enum('yes','no') DEFAULT 'no',
	`status` enum('pending','completed','failed') DEFAULT 'pending',
	`userId` varchar(64),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `donations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`eventDate` timestamp NOT NULL,
	`endDate` timestamp,
	`location` varchar(255),
	`imageUrl` text,
	`category` enum('worship','youth','community','outreach','prayer','other') DEFAULT 'other',
	`createdBy` varchar(64) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsletterSubscriptions` (
	`id` varchar(64) NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255),
	`status` enum('active','unsubscribed') DEFAULT 'active',
	`subscribedAt` timestamp DEFAULT (now()),
	`unsubscribedAt` timestamp,
	CONSTRAINT `newsletterSubscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletterSubscriptions_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `prayerRequests` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320),
	`request` text NOT NULL,
	`isPublic` enum('yes','no') DEFAULT 'no',
	`status` enum('pending','approved','archived') DEFAULT 'pending',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `prayerRequests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sermons` (
	`id` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`speaker` varchar(255) NOT NULL,
	`description` text,
	`sermonDate` timestamp NOT NULL,
	`videoUrl` text,
	`audioUrl` text,
	`thumbnailUrl` text,
	`scripture` varchar(255),
	`series` varchar(255),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sermons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `serviceTimes` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`dayOfWeek` enum('sunday','monday','tuesday','wednesday','thursday','friday','saturday') NOT NULL,
	`time` varchar(50) NOT NULL,
	`description` text,
	`isActive` enum('yes','no') DEFAULT 'yes',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `serviceTimes_id` PRIMARY KEY(`id`)
);

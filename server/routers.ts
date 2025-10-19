import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import { TRPCError } from "@trpc/server";
import * as db from "./db";
import { notifyOwner } from "./_core/notification";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Events management
  events: router({
    list: publicProcedure.query(async () => {
      return await db.getEvents();
    }),
    
    upcoming: publicProcedure.query(async () => {
      return await db.getUpcomingEvents();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await db.getEventById(input.id);
      }),
    
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        eventDate: z.date(),
        endDate: z.date().optional(),
        location: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.enum(["worship", "youth", "community", "outreach", "prayer", "other"]).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const id = nanoid();
        await db.createEvent({
          id,
          ...input,
          createdBy: ctx.user.id,
        });
        return { id };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        eventDate: z.date().optional(),
        endDate: z.date().optional(),
        location: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.enum(["worship", "youth", "community", "outreach", "prayer", "other"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateEvent(id, data);
        return { success: true };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        await db.deleteEvent(input.id);
        return { success: true };
      }),
  }),

  // Sermons library
  sermons: router({
    list: publicProcedure.query(async () => {
      return await db.getSermons();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await db.getSermonById(input.id);
      }),
    
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        speaker: z.string(),
        description: z.string().optional(),
        sermonDate: z.date(),
        videoUrl: z.string().optional(),
        audioUrl: z.string().optional(),
        thumbnailUrl: z.string().optional(),
        scripture: z.string().optional(),
        series: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = nanoid();
        await db.createSermon({ id, ...input });
        return { id };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.string(),
        title: z.string().optional(),
        speaker: z.string().optional(),
        description: z.string().optional(),
        sermonDate: z.date().optional(),
        videoUrl: z.string().optional(),
        audioUrl: z.string().optional(),
        thumbnailUrl: z.string().optional(),
        scripture: z.string().optional(),
        series: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateSermon(id, data);
        return { success: true };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        await db.deleteSermon(input.id);
        return { success: true };
      }),
  }),

  // Prayer requests
  prayerRequests: router({
    list: publicProcedure.query(async () => {
      return await db.getPrayerRequests(true); // Public only
    }),
    
    listAll: adminProcedure.query(async () => {
      return await db.getPrayerRequests(false); // All requests
    }),
    
    create: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email().optional(),
        request: z.string(),
        isPublic: z.enum(["yes", "no"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const id = nanoid();
        await db.createPrayerRequest({ id, ...input });
        
        // Notify owner of new prayer request
        await notifyOwner({
          title: "New Prayer Request",
          content: `From: ${input.name}\n\n${input.request}`,
        });
        
        return { id };
      }),
    
    updateStatus: adminProcedure
      .input(z.object({
        id: z.string(),
        status: z.enum(["pending", "approved", "archived"]),
      }))
      .mutation(async ({ input }) => {
        await db.updatePrayerRequest(input.id, { status: input.status });
        return { success: true };
      }),
  }),

  // Contact messages
  contact: router({
    send: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().optional(),
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        const id = nanoid();
        await db.createContactMessage({ id, ...input });
        
        // Notify owner of new contact message
        await notifyOwner({
          title: "New Contact Message",
          content: `From: ${input.name} (${input.email})\nSubject: ${input.subject || 'N/A'}\n\n${input.message}`,
        });
        
        return { id };
      }),
    
    list: adminProcedure.query(async () => {
      return await db.getContactMessages();
    }),
    
    updateStatus: adminProcedure
      .input(z.object({
        id: z.string(),
        status: z.enum(["new", "read", "responded"]),
      }))
      .mutation(async ({ input }) => {
        await db.updateContactMessage(input.id, input.status);
        return { success: true };
      }),
  }),

  // Newsletter subscriptions
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = nanoid();
        try {
          await db.createNewsletterSubscription({ id, ...input });
          return { success: true };
        } catch (error) {
          // Handle duplicate email
          throw new TRPCError({ 
            code: 'CONFLICT', 
            message: 'Email already subscribed' 
          });
        }
      }),
    
    unsubscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        await db.unsubscribeNewsletter(input.email);
        return { success: true };
      }),
    
    list: adminProcedure.query(async () => {
      return await db.getNewsletterSubscriptions();
    }),
  }),

  // Donations
  donations: router({
    create: publicProcedure
      .input(z.object({
        donorName: z.string().optional(),
        donorEmail: z.string().email().optional(),
        amount: z.number().positive(),
        purpose: z.string().optional(),
        isAnonymous: z.enum(["yes", "no"]).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const id = nanoid();
        await db.createDonation({
          id,
          ...input,
          userId: ctx.user?.id,
        });
        
        // Notify owner of new donation
        await notifyOwner({
          title: "New Donation Received",
          content: `Amount: $${(input.amount / 100).toFixed(2)}\nFrom: ${input.isAnonymous === "yes" ? "Anonymous" : input.donorName || "Unknown"}\nPurpose: ${input.purpose || "General"}`,
        });
        
        return { id };
      }),
    
    list: adminProcedure.query(async () => {
      return await db.getDonations();
    }),
    
    updateStatus: adminProcedure
      .input(z.object({
        id: z.string(),
        status: z.enum(["pending", "completed", "failed"]),
      }))
      .mutation(async ({ input }) => {
        await db.updateDonationStatus(input.id, input.status);
        return { success: true };
      }),
  }),

  // Church information
  churchInfo: router({
    get: publicProcedure.query(async () => {
      return await db.getChurchInfo();
    }),
    
    update: adminProcedure
      .input(z.object({
        name: z.string(),
        tagline: z.string().optional(),
        description: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().email().optional(),
        logoUrl: z.string().optional(),
        bannerUrl: z.string().optional(),
        facebookUrl: z.string().optional(),
        instagramUrl: z.string().optional(),
        youtubeUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = nanoid();
        await db.upsertChurchInfo({ id, ...input });
        return { success: true };
      }),
  }),

  // Service times
  serviceTimes: router({
    list: publicProcedure.query(async () => {
      return await db.getServiceTimes();
    }),
    
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        dayOfWeek: z.enum(["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]),
        time: z.string(),
        description: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = nanoid();
        await db.createServiceTime({ id, ...input });
        return { id };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.string(),
        name: z.string().optional(),
        dayOfWeek: z.enum(["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]).optional(),
        time: z.string().optional(),
        description: z.string().optional(),
        isActive: z.enum(["yes", "no"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateServiceTime(id, data);
        return { success: true };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        await db.deleteServiceTime(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;


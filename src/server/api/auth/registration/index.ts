import prisma from "~/server/utils/prisma"; // Import Prisma client
import bcrypt from "bcryptjs";
import { defineEventHandler, readBody, createError } from "h3"; // Make sure to import necessary types

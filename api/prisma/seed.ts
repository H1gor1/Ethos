import { prisma } from "../lib/prisma.js";
import "dotenv/config";
import bcrypt from "bcrypt";
import { PermissionEnum } from "../src/shared/enums/permission.enum.js";

async function main() {
    const roles = [
        { name: "ADMIN" },
        { name: "EDITOR" },
        { name: "USER" },
    ]

    for (const role of roles) {
        await prisma.role.upsert({
            where: { name: role.name },
            update: {},
            create: role,
        });
    }

    const allRoles = await prisma.role.findMany();

    const getRoleId = (name: string): number => {
        const role = allRoles.find((r) => r.name === name);
        if (!role) {
            throw new Error(`Role not found in seed: ${name}`);
        }
        return role.id;
    };

    const permissions = Object.values(PermissionEnum).map((name) => ({ name }));

    for (const permission of permissions) {
        await prisma.permission.upsert({
            where: { name: permission.name },
            update: {},
            create: permission,
        });
    }

    const allPermissions = await prisma.permission.findMany();

    const getPermissionId = (name: string): number => {
        const permission = allPermissions.find((p) => p.name === name);
        if (!permission) {
            throw new Error(`Permission not found in seed: ${name}`);
        }
        return permission.id;
    };


    const rolePermissions = [
        // Editor
        { roleId: getRoleId("EDITOR"), permissionId: getPermissionId("READ_USER") },
        { roleId: getRoleId("EDITOR"), permissionId: getPermissionId("UPDATE_USER") },

        { roleId: getRoleId("EDITOR"), permissionId: getPermissionId("CREATE_POST") },
        { roleId: getRoleId("EDITOR"), permissionId: getPermissionId("READ_POST") },
        { roleId: getRoleId("EDITOR"), permissionId: getPermissionId("READ_ALL_POSTS") },
        { roleId: getRoleId("EDITOR"), permissionId: getPermissionId("UPDATE_POST") },
        { roleId: getRoleId("EDITOR"), permissionId: getPermissionId("DELETE_POST") },

        { roleId: getRoleId("EDITOR"), permissionId: getPermissionId("CREATE_COMMENT") },
        { roleId: getRoleId("EDITOR"), permissionId: getPermissionId("READ_COMMENT") },
        { roleId: getRoleId("EDITOR"), permissionId: getPermissionId("UPDATE_COMMENT") },
        { roleId: getRoleId("EDITOR"), permissionId: getPermissionId("DELETE_COMMENT") },
        
        { roleId: getRoleId("EDITOR"), permissionId: getPermissionId("READ_PROFILE") },
        { roleId: getRoleId("EDITOR"), permissionId: getPermissionId("UPDATE_PROFILE") },

        // User
        
        { roleId: getRoleId("USER"), permissionId: getPermissionId("READ_USER") },
        { roleId: getRoleId("USER"), permissionId: getPermissionId("UPDATE_USER") },

        { roleId: getRoleId("USER"), permissionId: getPermissionId("READ_POST") },
        { roleId: getRoleId("USER"), permissionId: getPermissionId("READ_ALL_POSTS") },

        { roleId: getRoleId("USER"), permissionId: getPermissionId("CREATE_COMMENT") },
        { roleId: getRoleId("USER"), permissionId: getPermissionId("READ_COMMENT") },
        { roleId: getRoleId("USER"), permissionId: getPermissionId("UPDATE_COMMENT") },
        { roleId: getRoleId("USER"), permissionId: getPermissionId("DELETE_COMMENT") },
        
        { roleId: getRoleId("USER"), permissionId: getPermissionId("READ_PROFILE") },
        { roleId: getRoleId("USER"), permissionId: getPermissionId("UPDATE_PROFILE") },

    ]

    for (const rp of rolePermissions) {
        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: rp.roleId,
                    permissionId: rp.permissionId,
                }
            },
            update: {},
            create: {
                roleId: rp.roleId,
                permissionId: rp.permissionId,
            },
        });
    }

    for (const permission of allPermissions) {
        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: getRoleId("ADMIN"),
                    permissionId: permission.id
                },
            },
            update: {},
            create: {
                roleId: getRoleId("ADMIN"),
                permissionId: permission.id
            },
        });
    }

    const adminData = {
        username: process.env.ADMIN_USERNAME || "admin",
        email: process.env.ADMIN_EMAIL || "admin@teste.com",
        password: process.env.ADMIN_PASSWORD || "12345678",
    };

    const adminUser = await prisma.user.upsert({
        where: {
            email: adminData.email,
        },
        update: {},
        create: {
            username: adminData.username,
            email: adminData.email,
            password: await bcrypt.hash(adminData.password, 12),
        }
    });

    await prisma.profile.upsert({
        where: {
            userId: adminUser.id,
        },
        update: {},
        create: {
            userId: adminUser.id,
            bio: "ADMIN",
        }
    });

    await prisma.userRole.upsert({
        where: {
            userId_roleId: {
                userId: adminUser.id,
                roleId: getRoleId("ADMIN")
            }
        },
        update: {},
        create: {
            roleId: getRoleId("ADMIN"),
            userId: adminUser.id,
        },
    })
    
    console.log("Seeding completed.");
}

main()
    .catch((error) => {
        console.error("Seeding failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
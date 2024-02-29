-- CreateTable
CREATE TABLE `Case` (
    `id` VARCHAR(191) NOT NULL,
    `caseStatus` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `riskStatus` VARCHAR(191) NOT NULL,
    `riskScore` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `assigneeId` VARCHAR(191) NULL,
    `assignedAt` DATETIME(3) NULL,
    `suspectedUserId` VARCHAR(191) NULL,
    `suspectTypeId` INTEGER NOT NULL,
    `threatPageUrl` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Case_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

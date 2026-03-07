import { FACULTY_MAP, FacultyType } from "@/components/const/faculty"
import { Achievement } from "@/types/achievement"

function stripFacultyPrefix(name: string, isEnglish: boolean) {
    if (isEnglish) return name.replace(/^Faculty of\s+/i, "")
    return name
    .replace(/^คณะ/, '')
    .replace(/^สถาบัน/, '')
    .replace(/^สำนักวิชา/, '')
}

function getFacultyName(value: FacultyType, isEnglish: boolean) {
    const faculty = FACULTY_MAP[value]

    const name = isEnglish
        ? faculty.label.en
        : faculty.label.th

    return stripFacultyPrefix(name, isEnglish)
}

function getAbbrFacultyName(value: FacultyType, isEnglish: boolean) {
    const faculty = FACULTY_MAP[value]

    const name = isEnglish
        ? faculty.abbrLabel.en
        : faculty.abbrLabel.th

    return name
}

export function transformAchievement(
    achievement: Achievement,
    isEnglish: boolean
): Achievement {

    if (achievement.variant === "var2" && typeof achievement.stat === "string") {
        return {
        ...achievement,
        stat: getAbbrFacultyName(achievement.stat as FacultyType, isEnglish)
        }
    }

    if (achievement.variant === "var3") {
        return {
        ...achievement,
        faculty: getFacultyName(
            achievement.faculty as FacultyType,
            isEnglish
        )
        }
    }

    if (achievement.variant === "overall") {
        return {
        ...achievement,
        miniCard1Faculty: getAbbrFacultyName(
            achievement.miniCard1Faculty as FacultyType,
            isEnglish
        )
        }
    }

    return achievement
}
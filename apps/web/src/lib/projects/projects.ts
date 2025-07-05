import Project from "./Project";


export function getProjectByUUID(uuid: string): Project | null {
    const projectData = localStorage.getItem(`project-${ uuid }`);
    if (projectData == null) return null;
    return new Project(JSON.parse(projectData));
}

export function getLocalProjectsUUIDS(): Array<string> {
    const uuids = localStorage.getItem('localProjects');
    if (uuids == null) {
        localStorage.setItem('localProjects', '[]');
    }
    return JSON.parse(uuids == null ? '[]' : uuids);
}

export function updateLocalProjectsUUIDS(uuids: Array<string>) {
    localStorage.setItem('localProjects', JSON.stringify(uuids));
}

export function updateLocalProject(project: Project) {
    localStorage.setItem(`project-${ project.uuid }`, JSON.stringify(project));
}
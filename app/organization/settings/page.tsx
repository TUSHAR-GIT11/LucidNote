export default function OrganizationSettings(){
    const organization = {
        name:"Acme Corporation",
        plan:"free",
        members:5
    }
    return(
        <div>
            <h1>Organization Settings</h1>
            <p>Name:{organization.name}</p>
            <p>Plan:{organization.plan}</p>
            <p>Members:{organization.members}</p>
            <button>Invite Member</button>
        </div>
    )
}
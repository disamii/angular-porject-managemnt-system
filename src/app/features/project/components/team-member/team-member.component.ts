import { Component, Input } from "@angular/core"

@Component({
  selector: "app-team-member",
  templateUrl: "./team-member.component.html",
})
export class TeamMemberComponent {
  @Input() name = "Team Member"
  @Input() role = "Role"
  @Input() avatar = "/assets/images/avatar1.svg"
}

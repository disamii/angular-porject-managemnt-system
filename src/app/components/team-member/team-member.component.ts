import { Component, Input } from "@angular/core"

@Component({
  selector: "app-team-member",
  templateUrl: "./team-member.component.html",
  // styleUrls: ["./team-member.component.scss"],
})
export class TeamMemberComponent {
  @Input() name = "Team Member"
  @Input() role = "Role"
  @Input() avatar = "/assets/images/avatar1.svg"
}

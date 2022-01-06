export default function* Login(student: string) {
    // store student to state
    yield { set: { student } };
}
  
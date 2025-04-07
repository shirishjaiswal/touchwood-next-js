function addLinkToTemplate(template: string, link: string): string {
  const verifyLinkPattern = /<a[^>]*id=["']custom-link["'][^>]*>/i;

  if (verifyLinkPattern.test(template)) {
    return template.replace(
      /<a([^>]*)id=["']custom-link["']([^>]*)href=["'][^"']*["']([^>]*)>/i,
      `<a$1id="custom-link"$2href="${link}"$3>`
    );
  }
  console.log(template);
  return template;
}

function addUserNameToTemplate(template: string | undefined, userName: string): string {
  console.log(typeof template);
  console.log(template);
  if (typeof template !== 'string') {
    throw new Error('Email template is undefined or not a string');
  }
  console.log(template.replace(/{{\s*user_name\s*}}/g, userName));
  return template.replace(/{{\s*user_name\s*}}/g, userName);
}


export { addLinkToTemplate, addUserNameToTemplate };

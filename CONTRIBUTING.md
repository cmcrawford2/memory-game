# Contributors Guide

Welcome to the Memory Game contributors guide.

## Getting Started

Before you begin:

- Read the [Code of Conduct](https://github.com/cmcrawford2/memory-game/blob/main/COC.md/)
- Check out [existing issues](https://github.com/cmcrawford2/memory-game/issues)

If you want to learn how to work with this repo, this document will help.

Most of the documentation is currently written using [markdown](https://www.markdownguide.org/basic-syntax/) to make it easy to add, modify, and edit what we need to.

## The Basics

### Setting Up A GitHub Account

We're going to assume you know what [GitHub](https://www.howtogeek.com/180167/htg-explains-what-is-github-and-what-do-geeks-use-it-for/) is (otherwise, how would you be reading this?).

If you haven't made a GitHub account as yet, [make one now](https://github.com). It's free!

### Working With Issues

GitHub uses a feature called _issues_. Issues are a way to highlight bugs, features, problems, or any kind of action you want to happen on a GitHub hosted project (you can find out more [here](https://guides.github.com/features/issues/)).

If you find an issue you would like to work on, comment on the issue and a maintainer will respond and/or assign it to you. It can't be assigned to you unless you've commented on the issue.

We also use a `PR Submitted` tag to indicate when a pull request has been submitted for an issue, but it hasn't yet been merged, as most people would rather work on an issue with no attempted pull request yet.

If you feel like there's a contribution you would like to make that isn't represented by an already existing issue, feel free to create your own!

### Creating A Pull Request

If you'd like to make a pull request, please make sure that there's an issue (or create an issue) first, and **that you've been assigned to the issue.** This allows the maintainer team to provide guidance and prioritize tasks — otherwise you may run the risk of spending time on something that doesn't end up getting accepted for various reasons.

Once you've been assigned the issue, you have two options.

**The first option** is using the GitHub interface to fork the repo, making an edit right here in the GitHub client, and then submit a pull request (no code or terminals or IDE required). [This guide](https://guides.github.com/activities/hello-world/) shows just how to do that for a small personal repo. You would simply replace the step of creating a new repository to just navigating to this one and forking that instead. This is a great idea if you simply plan to add to or edit a markdown file.

**The second option** is go the traditional route of forking the repo, creating a local copy of that fork, and working on your changes that way. This is also the only way to go if this project expands to include an associated application.

### Setting Up Local Environment To Work On Issues

Please make sure you **create a new branch and work in this branch** to avoid pushing your changes directly into the `main` branch.

- Fork the repo to which you will make a pull request. Use the fork button in the upper right of the repository screen.
- Clone the repository to your local machine. Find "clone" under the green "code" button.
- Change to the new directory.
- type "git checkout -b branchname"
- Make changes to the files that you want to change, and save them.
- type "git add -A"
- type "git commit -m "Some comment about what you did"
- type "git push -u origin main"

### Create a pull request

- On your forked repository, select "Create pull request"
- Fill in the comments on the form.
- Click the "Create pull request" button.
- Merge and close the pull request.

### Awaiting Review

Once you've submitted your pull request, the only thing left is to wait from feedback from one of the project maintainers. Since this is volunteer work for all, of course, we ask for your patience if you don't see a response immediately.

If the pull request looks good, a maintainer will typically give feedback and merge the request immediately, otherwise they'll let you know what questions they have or what needs to change before your work can be accepted. Once it is, you'll see your changes on the main branch and VOILA, open source contribution complete!

### Suggested Changes

We may ask for changes to be made before a pull request can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.

As you update your pull request and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).

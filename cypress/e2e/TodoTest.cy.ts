/* eslint-disable cypress/no-unnecessary-waiting */

describe("", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  afterEach(() => {
    cy.wait(1000);
  });

  it("새로운 아이템 등록 테스트", () => {
    // given
    // when
    cy.get('input[placeholder="값을 입력해주세요"]').type("New Item");
    cy.contains("확인").click();

    // then
    cy.get("li").should("have.length", 4);
    cy.get("li")
      .last()
      .children("div")
      .children("span")
      .should("have.text", "4. New Item");
  });

  it("기존 아이템 수정 테스트", () => {
    // given
    // when
    cy.contains("수정").first().click();
    cy.get('input[placeholder="아이템 이름을 입력해주세요"]')
      .clear()
      .type("Update Item");
    cy.contains("완료").first().click();

    // then
    cy.get("li")
      .first()
      .children("div")
      .children("span")
      .should("have.text", "1. Update Item");
  });

  it("기존 아이템 삭제 테스트", () => {
    // given
    // when
    cy.contains("삭제").first().click();

    // then
    cy.get("li").should("have.length", 2);
    cy.get("li")
      .first()
      .children("div")
      .children("span")
      .should("have.text", "1. React");
  });
});

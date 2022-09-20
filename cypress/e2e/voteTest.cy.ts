/* eslint-disable cypress/no-unnecessary-waiting */
import { format } from "date-fns";

describe("", () => {
  const date = new Date();

  before(() => {
    cy.login(); // cypress-firebase에 설정된 어드민계정으로 사이트 방문전 로그인
  });

  beforeEach(() => {
    cy.visit("/");
    cy.contains("투표").click();
  });

  afterEach(() => {
    cy.wait(1000);
  });

  it("새로운 투표 추가", () => {
    cy.contains("투표 추가").click();

    cy.contains("항목추가").click();
    cy.contains("항목추가").click();

    cy.contains("삭제").click();

    // input 타입이 text인 모든 항목을 불러와 각 인덱스에 맞는 input에 임의값 적용
    cy.get('input[type="text"]').each((item, index) => {
      if (index === 0) {
        return cy
          .wrap(item)
          .type(`Cypress 테스트 (${format(date, "yyyy.MM.dd HH:mm:ss")})`);
      }
      return cy.wrap(item).type(`Test-${index}`);
    });

    cy.contains("등록").click();
  });

  it("생성된 투표 투표하기", () => {
    // 위에서 생성된 투표의 체크박스 리스트중 첫번째 아이템 선택
    cy.contains("Test-1").parent().children("label").first().click();

    // 정화히 일치하는 텍스트를 포함한 contains를 찾고 싶을때 RegExp사용
    cy.contains(new RegExp("^투표$", "g")).eq(0).click();

    cy.contains("확인").click();
  });

  it("생성된 투표의 투표결과 확인", () => {
    cy.contains("투표 결과").eq(0).click();
  });

  it("생성된 투표 삭제", () => {
    cy.get(".title").first().children("i").click();
  });

  // it("투표 모달창 닫기", () => {
  //   cy.contains("투표 추가").click();

  //   cy.contains("취소").click();
  // });
});

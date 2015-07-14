class StaticPagesController < ApplicationController

  before_action :redirect_unless_logged_in, only: [:root]

  def splash_page
  end

  def root
  end

end
